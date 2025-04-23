import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'; 
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../auth/dto/login.dto';
import { CustomSuccessResponse } from '../../common/exception/custom-success.exception';
import { SUCCESS_RESPONSE } from '../../common/response.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const accessToken = await this.generateAccessToken(user.email, user.user_id, user.role);
    const refreshToken = await this.generateRefreshToken(user.email, user.user_id, user.role);

    return new CustomSuccessResponse(SUCCESS_RESPONSE.RequestSuccess, { 
      accessToken,
      refreshToken,
     });
  }

  async generateAccessToken(email: string, id: number, role: any): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
  
    const payload = { role, email, id };
    const expiresIn = '1d';
  
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
  }
  
  async generateRefreshToken(email: string, id: number, role: any): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }
  
    const payload = { role, email, id };
    const expiresIn = '2d';
  
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
  }
  

}