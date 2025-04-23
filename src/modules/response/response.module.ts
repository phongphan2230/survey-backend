import { Module, Res } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseSchema } from 'src/entities/response-entites';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Response.name, schema: ResponseSchema }]),
    ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
