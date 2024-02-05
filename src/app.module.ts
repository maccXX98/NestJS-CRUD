import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';
import { WebsocketsGateway } from './websockets/websockets.gateway';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    DatabaseModule,
    ProfilesModule,
    PostsModule,
    WebsocketsModule,
  ],
  controllers: [],
  providers: [WebsocketsGateway],
})
export class AppModule {}
