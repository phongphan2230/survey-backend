import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from 'src/database/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { SurveySchema } from './entities/survey-entites';
import { ResponseSchema } from './entities/response-entites';
import { UserSchema } from './entities/user-entites';
import { UserModule } from './modules/user/user.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ResponseModule } from './modules/response/response.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => mongooseConfig,
    }),
    MongooseModule.forFeature([
      { name: 'Survey', schema: SurveySchema },
      { name: 'Response', schema: ResponseSchema },
      { name: 'User', schema: UserSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    SurveyModule,
    ResponseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
