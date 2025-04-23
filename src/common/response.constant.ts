import { HttpStatus } from '@nestjs/common';

export type TErrorCode =
   'InternalServer'|
   'InvalidInput'  |
   'Unauthorized'  |
   'NotFound'      |
   'AlreadyExists';

export interface IErrorResponse {
  statusCode: number;
  message: string;
}

export const ERROR_RESPONSE: Record<TErrorCode, IErrorResponse> = {
  InternalServer: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  InvalidInput: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid input data',
  },
  Unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized access',
  },
  NotFound: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Resource not found',
  },
  AlreadyExists: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Resource already exists',
  },
};



//hanlde response success
export type TSuccessCode =
   'RequestSuccess'|
   'LoginSuccess'  |
   'LogoutSuccess' |
   'ResourceCreated' |
   'DataUpdated' |
   "CreatedSuccess";

export interface IBaseResponse {
  statusCode: number;
  message: string;
}

export const SUCCESS_RESPONSE: Record<TSuccessCode, IBaseResponse> = {
  RequestSuccess: {
    statusCode: HttpStatus.OK,
    message: 'Request processed successfully',
  },
  LoginSuccess: {
    statusCode: HttpStatus.OK,
    message: 'Login successful',
  },
  LogoutSuccess: {
    statusCode: HttpStatus.OK,
    message: 'Logout successful',
  },
  ResourceCreated: {
    statusCode: HttpStatus.CREATED,
    message: 'Resource created successfully',
  },
  DataUpdated: {
    statusCode: HttpStatus.OK,
    message: 'Data updated successfully',
  },
  CreatedSuccess: {
    statusCode: HttpStatus.OK,
    message: 'Created successfully',
  },
};