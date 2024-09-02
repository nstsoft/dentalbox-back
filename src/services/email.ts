import { awsProvider } from '@providers';

export const sendInvitationLink = async (link: string, recipient: string) => {
  return awsProvider.sendEmail([recipient], { subject: 'invitation', text: link });
};
