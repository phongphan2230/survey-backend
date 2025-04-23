import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  async create(@Body() createResponseDto: CreateResponseDto) {
    return await this.responseService.create(createResponseDto);
  }

  @Get()
  async findAll() {
    return await this.responseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.responseService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResponseDto: UpdateResponseDto) {
    return await this.responseService.update(id, updateResponseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.responseService.remove(id);
  }
}