import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { CustomSuccessResponse } from '../../common/exception/custom-success.exception';
import { CustomHttpException } from '../../common/exception/custom-error.exception';
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from '../../common/response.constant';
import { JwtAuthGuard } from '../../middleware/guard/jwt_guard';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    const result = await this.surveyService.create(createSurveyDto);
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.CreationFailed);
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.ResourceCreated, result);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const result = await this.surveyService.findAll();
    if (!result || result.length === 0) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.RequestSuccess, result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.surveyService.findOne(id);
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.NotFound);
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.RequestSuccess, result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    const result = await this.surveyService.update(id, updateSurveyDto);
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.UpdateFailed);
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.ResourceUpdated, result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.surveyService.remove(id);
    if (!result) {
      throw new CustomHttpException(ERROR_RESPONSE.DeletionFailed);
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.ResourceDeleted, result);
  }
}