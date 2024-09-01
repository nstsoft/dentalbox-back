import { awsProvider } from '@providers';
import { UserEntity } from '@src/domains';

export const sentOtp = async (user: UserEntity, otp: number) => {
  const message = `Your One Time Password is ${otp}`;
  try {
    if (user.phone) {
      return await awsProvider.sendSms(user.phone, message);
    }
    if (user.email) {
      return await awsProvider.sendEmail([user.email], { subject: 'otp', text: message });
    }
  } catch (err) {
    console.log(err);
  }
};
