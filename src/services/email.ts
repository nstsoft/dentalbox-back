import { config } from '@config';
import { awsProvider } from '@providers';

export const sendInvitationLink = async (link: string, recipient: string) => {
  if (config.LAUNCH === 'local') return null;
  return awsProvider.sendEmail([recipient], { subject: 'invitation', text: link });
};
