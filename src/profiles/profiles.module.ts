import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { profileProviders } from './providers/profile.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfilesController],
  providers: [...profileProviders, ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
