import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';
import { IBaseEntity } from '../auth-interface/base-entity.interface';
import { IUser } from '../auth-interface/user-entity.interface';

@Entity()
@Unique(['email'])
export class User implements IUser, IBaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  profilePicture?: string;

  @Column()
  updateAt: string;

  @Column()
  createAt: string;

  @Column()
  accountData?: string;

  @Column()
  credential: string;

  @Column()
  password: string;

  @Column()
  confirmed: boolean;
}
