import { InvitationStatus, RawInvitation, UserRole } from '../types';
import { BaseEntity } from './Base';

export class Invitation extends BaseEntity {
  email: string;
  workspace: string;
  status: InvitationStatus;
  userRole: UserRole;
  activeTill: number;
  _id: string;

  constructor({ email, workspace, status, userRole, _id, activeTill }: RawInvitation) {
    super();
    this.email = email;
    this.workspace = workspace;
    this.status = status;
    this._id = _id;
    this.userRole = userRole;
    this.activeTill = activeTill;
  }
}
