import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomSuccessResponse } from '../../common/exception/custom-success.exception';
import { SUCCESS_RESPONSE } from '../../common/response.constant';
import { JwtAuthGuard } from '../../middleware/guard/jwt_guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    if (!result) {
      throw new CustomSuccessResponse(SUCCESS_RESPONSE.RequestSuccess, 'User creation failed');
    }
    return new CustomSuccessResponse(SUCCESS_RESPONSE.ResourceCreated, result);
  }

}
