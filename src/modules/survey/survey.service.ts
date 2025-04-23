import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '../../entities/survey-entites';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { CustomHttpException } from '../../common/exception/custom-error.exception';
import { ERROR_RESPONSE } from '../../common/response.constant';

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
    const surveys = await this.surveyModel.find().exec();
    if (!surveys || surveys.length === 0) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return surveys;
  }

  async findOne(id: string): Promise<Survey> {
    const survey = await this.surveyModel.findById(id).exec();
    if (!survey) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const updatedSurvey = await this.surveyModel
      .findByIdAndUpdate(id, updateSurveyDto, { new: true })
      .exec();
    if (!updatedSurvey) {
      throw new CustomHttpException(ERROR_RESPONSE.UpdateFailed);
    }
    return updatedSurvey;
  }

  async remove(id: string): Promise<any> {
    const result = await this.surveyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.DeletionFailed);
    }
    return { message: 'Survey deleted successfully' };
  }
}