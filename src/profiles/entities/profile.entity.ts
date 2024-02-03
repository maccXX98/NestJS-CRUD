import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 150 })
  public firstName: string;

  @Column({ length: 150 })
  public lastName: string;

  @Column()
  public age: number;
}
