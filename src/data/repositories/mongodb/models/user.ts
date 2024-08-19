import { UserRole, UserType } from '@domains';
import { removeUndefinedProps } from '@utils';
import bcryptjs from 'bcryptjs';
import { config } from 'config';
import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserModel {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: true, type: 'text' })
  email: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, config.BCRYPT_SALT);
  }
  @Column({ type: 'enum', enum: UserRole, default: UserRole.doctor, array: false })
  role: UserRole;

  constructor(user: UserType) {
    this.email = user?.email;
    this.name = user?.name;
    this.password = user?.password;
    this.role = user?.role;
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
