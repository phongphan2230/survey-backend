import { HttpException } from '@nestjs/common';
import { IErrorResponse } from '../response.constant';

export class CustomHttpException extends HttpException {
  constructor(error: IErrorResponse, customMessage?: string) {
    super(
      {
        statusCode: error.statusCode,
        message: customMessage || error.message,
      },
      error.statusCode,
    );
  }
}
