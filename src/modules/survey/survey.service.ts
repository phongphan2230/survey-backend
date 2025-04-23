import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '../../entities/survey-entites';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private readonly surveyModel: Model<SurveyDocument>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const newSurvey = new this.surveyModel(createSurveyDto);
    return newSurvey.save();
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  async findOne(id: string): Promise<Survey> {
    const survey = await this.surveyModel.findById(id).exec();
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const updatedSurvey = await this.surveyModel
      .findByIdAndUpdate(id, updateSurveyDto, { new: true })
      .exec();
    if (!updatedSurvey) {
      throw new NotFoundException('Survey not found');
    }
    return updatedSurvey;
  }

  async remove(id: string): Promise<void> {
    const result = await this.surveyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Survey not found');
    }
  }
}