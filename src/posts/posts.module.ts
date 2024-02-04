import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './providers/post.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from '../users/users.service';
import { userProviders } from '../users/providers/user.providers';
import { profileProviders } from '../profiles/providers/profile.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [
    ...postProviders,
    ...userProviders,
    ...profileProviders,
    PostsService,
    UsersService,
  ],
})
export class PostsModule {}
