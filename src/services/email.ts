import { nodeMailerProvider } from '@providers';

export const sendInvitationLink = async (link: string, recipient: string) => {
  return nodeMailerProvider.sendEmail(recipient, {
    subject: 'Invitation to join',
    text: `Use this link to join our workspace: ${link}`,
    html: `Use this link to join our workspace: <a href="${link}">${link}</a>`,
  });
};
