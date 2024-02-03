import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './providers/user.providers';
import { DatabaseModule } from '../database/database.module';
import { profileProviders } from '../profiles/providers/profile.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, ...profileProviders, UsersService],
})
export class UsersModule {}