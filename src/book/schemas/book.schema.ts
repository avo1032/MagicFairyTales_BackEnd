import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Page, PageSchema } from './page.schema';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [PageSchema], default: [] })
  pages: Page[];

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  deletedAt?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
