import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Story } from './new.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel('Story') private readonly newModel: Model<Story>) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    console.log('Populate News EVERY_HOUR...');
    this.populateNews();
  }

  async populateNews() {
    console.log('populateNews called...');

    try {
      await this.newModel.deleteMany({});

      let response = await axios.get(
        'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
      );

      let loaded: string[] = [];

      await response.data.hits.forEach(async (hackerNew) => {
        // console.log(hackerNew.story_title);

        if (hackerNew.tile === null) {
          hackerNew.tile = 'test';
        }

        const newNewStory = new this.newModel({
          title: hackerNew.tile,
          story_title: hackerNew.story_title,
          created_at: hackerNew.created_at,
          created_at_order: hackerNew.created_at_i,
          url: hackerNew.story_url,
          author: hackerNew.author,
          story_id: hackerNew.story_id,
        });

        await newNewStory.save();
      });

      return [{ storiesLoaded: 'success' }];
    } catch (error) {
      throw new NotFoundException({
        storiesLoaded: 'Could not load the news from Hacker News',
      });
    }
  }

  async getNews() {
    const news = await this.newModel.find().exec();

    return news.map((story) => ({
      id: story.id,
      title: story.title,
      story_title: story.story_title,
      created_at: story.created_at,
      created_at_order: story.created_at_order,
      url: story.url,
      author: story.author,
      story_id: story.story_id,
    }));
  }
}
