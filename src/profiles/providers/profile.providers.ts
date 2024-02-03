import { DataSource } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { PROFILE_REPOSITORY, DATA_SOURCE } from '../../constants';

export const profileProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: [DATA_SOURCE],
  },
];
