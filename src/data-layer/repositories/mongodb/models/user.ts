import { UserRole, UserType } from '@domains';
import { removeUndefinedProps } from '@utils';
import bcryptjs from 'bcryptjs';
import { config } from 'config';
import { ObjectId } from 'mongodb';
import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

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
  @Column({ array: true })
  roles: Role[];
  @Column({ array: true })
  workspaces?: ObjectId[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt(config.BCRYPT_SALT));
  }

  constructor(user: UserType) {
    this.email = user?.email;
    this.name = user?.name;
    this.password = user?.password;
    if (user?.workspaces) {
      this.roles = user.roles.map(({ workspace, role }) => ({ workspace: new ObjectId(workspace), role }));
      this.workspaces = user.workspaces.map((id) => new ObjectId(id));
    }

    this._id = new ObjectId();
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
