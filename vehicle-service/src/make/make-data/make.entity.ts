import { Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IBaseEntity } from '../make-interfaces/base-entity.interface';
import { IMake } from '../make-interfaces/make-entity.interface';

export class Make implements IMake, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
