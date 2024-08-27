import { InvitationStatus, RawInvitation, UserRole } from '../types';
import { Base } from './Base';

export class Invitation extends Base {
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
