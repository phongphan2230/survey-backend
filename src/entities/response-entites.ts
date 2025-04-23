import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ResponseDocument = Response & Document;

class Answer {
  @Prop({ required: true })
  question: String;

  @Prop({ required: true })
  value: string;
}

const AnswerSchema = SchemaFactory.createForClass(Answer);

@Schema({ timestamps: { createdAt: 'submittedAt', updatedAt: false } })
export class Response {
  @Prop({ type: Types.ObjectId, ref: 'Survey', required: true })
  survey: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  user?: Types.ObjectId;

  @Prop({ type: [AnswerSchema], default: [] })
  answers: Answer[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
