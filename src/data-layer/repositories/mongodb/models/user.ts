import { UserRole, UserStatus, UserType } from '@domains';
import { removeUndefinedProps } from '@utils';
import bcryptjs from 'bcryptjs';
import { config } from 'config';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export class Role {
  @Column()
  workspace: ObjectId;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.doctor, array: true })
  role: UserRole;
}

@Entity('users')
export class UserModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  email: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  password: string;
  @Column({ unique: false, type: 'text' })
  surname: string;
  @Column({ unique: false, type: 'text' })
  secondName: string;
  @Column({ unique: false, type: 'text' })
  phone?: string;
  @Column({ unique: false, type: 'text' })
  address?: string;
  @Column({ unique: false, type: 'text' })
  notes?: string;
  @Column({ array: true })
  roles: Role[];
  @Column({ array: false, enum: UserStatus, default: UserStatus.pending })
  status: UserStatus;
  @Column({ array: true })
  workspaces?: ObjectId[];
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'boolean', default: false })
  isVerified: boolean;
  @Column({ unique: false, type: 'boolean', default: true })
  enableNotifications: boolean;
  @Column({ unique: false, type: 'number' })
  otp: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt(config.BCRYPT_SALT));
  }

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(user: UserType) {
    this._id = new ObjectId();
    this.email = user?.email;
    this.name = user?.name;
    this.secondName = user?.secondName;
    this.surname = user?.surname;
    this.phone = user?.phone;
    this.address = user?.address;
    this.notes = user?.notes;
    this.password = user?.password;
    this.otp = user?.otp;
    this.isVerified = user?.isVerified;
    this.enableNotifications = user?.enableNotifications;
    this.status = user?.status;
    if (user?.workspaces) {
      this.roles = user.roles.map(({ workspace, role }) => ({ workspace: new ObjectId(workspace), role }));
      this.workspaces = user.workspaces.map((id) => new ObjectId(id));
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
