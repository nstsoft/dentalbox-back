import { invitationSource, subscriptionSource, userSource, workspaceSource } from '@data';
import { InvitationStatus, RegistrationDto, UserEntity, UserRole, UserStatus } from '@domains';
import { AuthError } from '@errors';
import { googleProvider, stripeProvider } from '@providers';
import { sentOtp, uploadWorkspaceImage } from '@services';
import { generateOTP, getAuthTokens } from '@utils';
import axios, { AxiosError } from 'axios';
import { config } from 'config';
import moment from 'moment';
import querystring from 'querystring';
import { MoreThan } from 'typeorm';

export const getAuthenticationData = async (user: UserEntity) => {
  const [tokens] = await Promise.all([getAuthTokens(user._id)]);

  return { ...tokens, user: user.toObject() };
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
  let userId,
    workspaceId,
    stripeCustomerId,
    stripeSubscriptionId = null;

  try {
    await invitationSource.update(
      { email: data.user.email, activeTill: MoreThan(moment().unix()) },
      { status: InvitationStatus.declined },
    );

    const product = await stripeProvider.product.getOne(data.productId);
    if (!product.prices.some(({ priceId }) => priceId !== data.priceId)) {
      throw new Error('Invalid product');
    }
    const maxMembersCount = +product.metadata.team;
    const workspace = await workspaceSource.create({
      ...data.workspace,
      maxMembersCount,
      currentMembersCount: 1,
    });

    workspaceId = workspace._id;

    if (workspaceImage) {
      const { location } = await uploadWorkspaceImage(workspace._id, workspaceImage);

      await workspaceSource.updateOne(workspace._id, { image: location });
    }

    const stripeCustomer = await stripeProvider.customer.create(data.user.email);
    stripeCustomerId = stripeCustomer.id;
    const otp = generateOTP();

    const user = await userSource.create({
      ...data.user,
      status: UserStatus.active,
      isVerified: false,
      otp,
      enableNotifications: true,
      workspaces: [workspace._id],
      roles: [{ workspace: workspace._id, role: UserRole.admin }],
      stripeCustomerId,
    });

    userId = user._id;

    const stripeSubscription = await stripeProvider.subscription.create(stripeCustomerId, data.priceId);
    stripeSubscriptionId = stripeSubscription.id;

    const [subscription] = await Promise.all([
      subscriptionSource.create({
        workspace: workspace._id,
        product: product.productId,
        priceId: data.priceId,
        stripeSubscription: stripeSubscriptionId,
      }),
      sentOtp(user, otp),
    ]);

    return { user, workspace, subscription, stripeSubscription };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    await Promise.allSettled([
      userId && userSource.delete(userId),
      workspaceId && workspaceSource.delete(workspaceId),
      stripeSubscriptionId && stripeProvider.cancelSubscription(stripeSubscriptionId),
      stripeCustomerId && stripeProvider.removeCustomer(stripeCustomerId),
    ]);

    return Promise.reject(err);
  }
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
