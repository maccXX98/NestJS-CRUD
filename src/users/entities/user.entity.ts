import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 150 })
  public userName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ nullable: true })
  public authStrategy: string;

  @OneToOne(() => Profile, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  public profile: Profile;

  @OneToMany(() => Post, (post) => post.author, { lazy: true })
  posts: Promise<Post[]>;
}
