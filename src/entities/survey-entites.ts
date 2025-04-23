import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SurveyDocument = Survey & Document;

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SINGLE_CHOICE = 'single_choice',
  TEXT = 'text',
}

@Schema()
export class Question {
  @Prop({ default: () => uuidv4() })
  id: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], default: [] })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ type: String, enum: QuestionType, required: true })
  type: QuestionType;
}

@Schema({ timestamps: true })
export class Survey {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  creator: string;

  @Prop({ type: [Question], default: [] })
  questions: Question[];

  @Prop({ default: true })
  isActive: boolean;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);