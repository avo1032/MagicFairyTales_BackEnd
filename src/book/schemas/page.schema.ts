import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Page extends Document {
  @Prop()
  script: string;

  @Prop()
  image: string;

  @Prop()
  audio: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
