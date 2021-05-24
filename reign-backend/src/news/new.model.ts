import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
  title: { type: String },
  story_title: { type: String },
  created_at: { type: String },
  created_at_order: { type: Number },
  url: { type: String },
  author: { type: String },
  story_id: { type: String },
});

export interface Story extends mongoose.Document {
  id: string;
  title?: string;
  story_title?: string;
  created_at?: string;
  created_at_order?: number;
  url?: string;
  author?: string;
  story_id?: string;
}
