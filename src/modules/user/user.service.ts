import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/entities/user-entites';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CustomHttpException } from '../../common/exception/custom-error.exception';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../../common/response.constant';
@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password,  } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new CustomHttpException(ERROR_RESPONSE.AlreadyExists);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: createUserDto.role ? 'admin' : 'user',
    });

    return createdUser.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec(); 
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject(); 
      return result;
    }
    return null;
  }
}
