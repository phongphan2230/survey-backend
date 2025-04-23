import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStategy } from 'src/middleware/stategy/accesstoken.stategy';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenStategy],
})
export class AuthModule {}
