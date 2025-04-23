import { Types } from 'mongoose';

export class CreateResponseDto {
  survey: Types.ObjectId;
  user?: Types.ObjectId;
  answers: {
    question: string;
    value: string;
  }[];
}