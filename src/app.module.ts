import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    DatabaseModule,
    ProfilesModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
