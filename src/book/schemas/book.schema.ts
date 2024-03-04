import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Page } from './page.schema';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  // @Prop({ required: true })
  // thumbnail: string;

  // @Prop({ type: [PageSchema], default: [] })
  // pages: Page[];

  // @Prop({ default: 0 })
  // views: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
