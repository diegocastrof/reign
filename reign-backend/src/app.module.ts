import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://regisTest:HTP3CiLQVjYLfeJE@clusternodeserver.tllig.mongodb.net/nestjs-database?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
