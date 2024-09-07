import { WorkspaceType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('workspaces')
export class WorkspaceModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: true, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  image?: string;
  @Column({ unique: false, type: 'text' })
  description: string;
  @Column({ unique: false, type: 'number' })
  maxMembersCount: number;
  @Column({ unique: false, type: 'number', default: 1 })
  currentMembersCount: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(workspace: WorkspaceType) {
    this.name = workspace?.name;
    this.image = workspace?.image;
    this.description = workspace?.description;
    this.maxMembersCount = workspace?.maxMembersCount;
    this.currentMembersCount = workspace?.currentMembersCount;
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
