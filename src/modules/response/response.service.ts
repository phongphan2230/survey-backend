import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { Response, ResponseDocument } from '../../entities/response-entites';
import { CustomHttpException } from '../../common/exception/custom-error.exception';
import { ERROR_RESPONSE } from '../../common/response.constant';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response.name) private readonly responseModel: Model<ResponseDocument>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    try {
      const newResponse = new this.responseModel({
        survey: createResponseDto.survey,
        user: createResponseDto.user,
        answers: createResponseDto.answers.map(answer => ({
          questionId: answer.question,
          value: answer.value,
        })),
      });
      return await newResponse.save();
    } catch (error) {
      throw new CustomHttpException(ERROR_RESPONSE.CreationFailed);
    }
  }

  async findAll(): Promise<Response[]> {
    const responses = await this.responseModel.find().exec();
    if (!responses || responses.length === 0) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return responses;
  }

  async findOne(id: string): Promise<Response> {
    const response = await this.responseModel.findById(id).exec();
    if (!response) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return response;
  }

  async update(id: string, updateResponseDto: UpdateResponseDto): Promise<Response> {
    const updatedResponse = await this.responseModel
      .findByIdAndUpdate(
        id,
        {
          survey: updateResponseDto.survey,
          user: updateResponseDto.user,
          answers: updateResponseDto.answers
            ? updateResponseDto.answers.map(answer => ({
                question: answer.question,
                value: answer.value,
              }))
            : undefined,
        },
        { new: true },
      )
      .exec();
    if (!updatedResponse) {
      throw new CustomHttpException(ERROR_RESPONSE.UpdateFailed);
    }
    return updatedResponse;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.responseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.DeletionFailed);
    }
    return { message: 'Response deleted successfully' };
  }
}