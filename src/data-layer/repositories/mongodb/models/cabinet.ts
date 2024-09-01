import { CabinetType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('cabinets')
export class CabinetModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: true, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  image: string;
  @Column({ unique: false, type: 'text' })
  description: string;
  @Column({ unique: false, type: 'text' })
  address: string;
  @Column({ unique: false, type: 'text' })
  phone: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ array: true })
  users?: ObjectId[];
  @Column({ array: false })
  workspace?: ObjectId;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(cabinet: CabinetType) {
    this.name = cabinet?.name;
    this.image = cabinet?.image;
    this.description = cabinet?.description;
    this.phone = cabinet?.phone;
    this.address = cabinet?.address;
    if (cabinet?.workspace) {
      this.workspace = new ObjectId(cabinet?.workspace);
    }
    if (cabinet?.users) {
      this.users = cabinet.users.map((id) => new ObjectId(id));
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
