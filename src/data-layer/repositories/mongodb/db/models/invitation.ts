import { InvitationStatus, InvitationType, UserRole } from '@domains';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('invitations')
@Index(['email', 'workspace'], { unique: false })
@Index(['email', 'workspace', 'status'], { unique: false })
export class InvitationModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: false, type: 'string' })
  @Index({ unique: false })
  email: string;
  @Column({ unique: false, type: 'string' })
  @Index({ unique: false })
  workspace: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.doctor, array: true })
  userRole: UserRole;
  @Column({ type: 'enum', enum: InvitationStatus, default: InvitationStatus.pending, array: true })
  status: InvitationStatus;
  @Column({ unique: false, type: 'number' })
  activeTill: number;

  constructor(invitation: InvitationType) {
    if (invitation) {
      this.email = invitation?.email;
      this.workspace = invitation?.workspace;
      this.userRole = invitation?.userRole;
      this.activeTill = invitation?.activeTill;
      this.status = invitation?.status;
    }
  }
}
