import { InvitationType, UserRole } from '@domains';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('invitations')
export class InvitationModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: false, type: 'string' })
  email: string;
  @Column({ unique: false, type: 'string' })
  workspace: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.doctor, array: true })
  userRole: UserRole;
  @Column({ unique: false, type: 'number' })
  activeTill: number;

  constructor(invitation: InvitationType) {
    if (invitation) {
      this.email = invitation?.email;
      this.workspace = invitation?.workspace;
      this.userRole = invitation?.userRole;
      this.activeTill = invitation?.activeTill;
    }
  }
}
