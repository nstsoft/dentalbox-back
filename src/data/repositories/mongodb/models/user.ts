import { UserRole, UserType } from '@domains';
import { removeUndefinedProps } from '@utils';
import bcryptjs from 'bcryptjs';
import { config } from 'config';
import { ObjectId } from 'mongodb';
import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  email: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.doctor, array: false })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt(config.BCRYPT_SALT));
  }

  constructor(user: UserType) {
    this.email = user?.email;
    this.name = user?.name;
    this.password = user?.password;
    this.role = user?.role;
    this._id = new ObjectId();
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
