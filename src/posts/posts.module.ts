import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './providers/post.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from '../users/users.service';
import { userProviders } from '../users/providers/user.providers';
import { profileProviders } from '../profiles/providers/profile.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [PostsController],
  providers: [
    ...postProviders,
    ...userProviders,
    ...profileProviders,
    PostsService,
    UsersService,
  ],
  exports: [PostsService],
})
export class PostsModule {}
