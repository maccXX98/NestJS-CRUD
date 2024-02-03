import { DataSource } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TASK_REPOSITORY, DATA_SOURCE } from '../../constants';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [DATA_SOURCE],
  },
];
