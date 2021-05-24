import {
  Controller,
  Post,
  // Body,
  Get,
  // Param,
  // Patch,
  // Delete,
} from '@nestjs/common';

import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews() {
    return this.newsService.getNews();
  }

  @Post()
  async addNews() {
    return this.newsService.populateNews();
  }
}
