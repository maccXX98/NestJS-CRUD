import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 200 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column()
  status: TaskStatus;
}
