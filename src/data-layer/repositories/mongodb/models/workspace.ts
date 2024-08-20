import { WorkspaceType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('workspaces')
export class WorkspaceModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  image: string;
  @Column({ unique: false, type: 'text' })
  description: string;

  constructor(workspace: WorkspaceType) {
    this.name = workspace?.name;
    this.image = workspace?.image;
    this.description = workspace?.description;
    this._id = new ObjectId();
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
