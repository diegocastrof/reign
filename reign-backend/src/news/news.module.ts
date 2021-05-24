import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { StorySchema } from './new.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
