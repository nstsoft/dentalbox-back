import { planSource, subscriptionSource, userSource, workspaceSource } from '@data';
import { RegistrationDto, SubscriptionStatus, UserEntity, UserRole, UserStatus } from '@domains';
import { AuthError } from '@errors';
import { googleProvider } from '@providers';
import { sentOtp, uploadWorkspaceImage } from '@services';
import { generateOTP, getAuthTokens } from '@utils';
import axios, { AxiosError } from 'axios';
import { config } from 'config';
import moment from 'moment';
import querystring from 'querystring';

export const getAuthenticationData = async (user: UserEntity) => {
  const [workspacesData, tokens] = await Promise.all([
    workspaceSource.getManyByIds(user.workspaces),
    getAuthTokens(user._id),
  ]);

  return {
    ...tokens,
    user: user.toObject(),
    workspaces: workspacesData.map((w) => ({ _id: w._id, name: w.name, image: w.image })),
  };
};

export const login = async (login: string, password: string) => {
  try {
    const user = await userSource.findOneByLogin(login);

    if (!user || !(await user.comparePassword(password))) {
      throw new AuthError('Unauthorized', { message: ' Invalid credentials' });
    }
    return user;
  } catch (_err) {
    throw new AuthError('Unauthorized', { message: ' Invalid credentials' });
  }
};

export const register = async (data: RegistrationDto, workspaceImage?: Buffer) => {
  const plan = await planSource.findOneOrFail({ _id: data.plan });
  const workspace = await workspaceSource.create({ ...data.workspace });

  if (workspaceImage) {
    const { location } = await uploadWorkspaceImage(workspace._id, workspaceImage);
    await workspaceSource.updateOne(workspace._id, { image: location });
  }

  const otp = generateOTP();

  const user = await userSource.create({
    ...data.user,
    status: UserStatus.active,
    isVerified: false,
    otp,
    enableNotifications: true,
    workspaces: [workspace._id],
    roles: [{ workspace: workspace._id, role: UserRole.admin }],
  });

  const [subscription] = await Promise.all([
    subscriptionSource.create({
      workspace: workspace._id,
      interval: plan.type,
      plan: plan._id,
      activeTill: moment().add(1, 'w').unix(),
      status: SubscriptionStatus.trial,
    }),
    sentOtp(user, otp),
  ]);

  return { user, workspace, subscription };
};

export const getGoogleAuthUrl = () => googleProvider.getGoogleAuthUrl();

export const authenticateWithGoogle = async (code: string) => {
  const { access_token } = await googleProvider.getToken(code);

  const query = { provider: 'google', status: 200 };

  try {
    const { data: userInfo } = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
    );

    const user = await userSource.findOneOrFail({ email: userInfo.email });
    const tokens = await getAuthTokens(user._id);
    Object.assign(query, tokens);
    Object.assign(query, { user: user.toJson() });
  } catch (err: unknown) {
    Object.assign(query, { status: 403, error: (err as AxiosError)?.response?.data ?? (err as Error).message ?? err });
  }

  return `${config.AUTH_REDIRECT_URL}?${querystring.stringify(query)}`;
};
