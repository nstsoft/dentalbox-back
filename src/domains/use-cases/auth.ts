import { planSource, subscriptionSource, userSource, workspaceSource } from '@data';
import { RegistrationDto, SubscriptionStatus } from '@domains';
import { AuthError } from '@errors';
import { generateOTP, getAuthTokens } from '@utils';
import axios, { AxiosError } from 'axios';
import { config } from 'config';
import moment from 'moment';
import querystring from 'querystring';

export const login = async (email: string, password: string) => {
  try {
    const user = await userSource.findOneOrFail({ email });

    if (!(await user.comparePassword(password))) {
      throw new AuthError('Unauthorized', { message: ' Invalid credentials' });
    }

    return getAuthTokens(user._id).then((resp) => ({ ...resp, user: user.toObject() }));
  } catch (_err) {
    throw new AuthError('Unauthorized', { message: ' Invalid credentials' });
  }
};

export const register = async (data: RegistrationDto) => {
  const [workspace, plan] = await Promise.all([
    workspaceSource.create({ ...data.workspace, image: '' }),
    planSource.findOneById(data.plan),
  ]);

  if (!plan) {
    throw new Error('Plan not found');
  }

  const user = await userSource.create({
    ...data.user,
    isVerified: false,
    otp: generateOTP(),
    enableNotifications: true,
    workspaces: [workspace._id],
    roles: [{ workspace: workspace._id, role: data.user.role }],
  });

  const activeTill = moment().add(1, 'w').add(1, plan.type);

  const subscription = await subscriptionSource.create({
    workspace: workspace._id,
    interval: plan.type,
    plan: plan._id,
    activeTill: activeTill.unix(),
    status: SubscriptionStatus.pending,
  });

  return { workspace, user, subscription };
};

export const getGoogleAuthUrl = () => {
  const params = {
    client_id: config.GOOGLE_CLIENT_ID,
    redirect_uri: config.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'profile email',
  };

  return `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;
};

export const authenticateWithGoogle = async (code: string) => {
  const { data } = await axios.post(
    'https://oauth2.googleapis.com/token',
    querystring.stringify({
      client_id: config.GOOGLE_CLIENT_ID,
      client_secret: config.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.GOOGLE_REDIRECT_URI,
    }),
  );
  const accessToken = data.access_token;

  const query = { provider: 'google', status: 200 };

  try {
    const { data: userInfo } = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
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
