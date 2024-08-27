import { BaseEntity } from '@utils';

import { UserRole } from './user';

export enum InvitationStatus {
  pending = 'pending',
  accepted = 'accepted',
}

export type InvitationType = {
  workspace: string;
  userRole: UserRole;
  email: string;
  activeTill: number;
  status: InvitationStatus;
};

export type RawInvitation = InvitationType & { _id: string };

export type InvitationEntity = BaseEntity<RawInvitation>;
