import { MongooseModuleOptions } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

export const mongooseConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/surveydb',
};

