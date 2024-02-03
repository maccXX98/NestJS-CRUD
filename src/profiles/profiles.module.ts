import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { DatabaseModule } from '../database/database.module';
import { profileProviders } from './providers/profile.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfilesController],
  providers: [...profileProviders, ProfilesService],
})
export class ProfilesModule {}
