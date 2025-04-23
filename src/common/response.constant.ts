import { HttpStatus } from '@nestjs/common';

export type TErrorCode =
   'InternalServer' |
   'InvalidInput'   |
   'Unauthorized'   |
   'NotFound'       |
   'AlreadyExists'  |
   'Forbidden'      | // Thêm trạng thái lỗi mới
   'CreationFailed' |
   'UpdateFailed'   |
   'DeletionFailed';

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
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Resource not found',
  },
  AlreadyExists: {
    statusCode: HttpStatus.CONFLICT,
    message: 'Resource already exists',
  },
  Forbidden: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Access to this resource is forbidden',
  },
  CreationFailed: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Failed to create resource',
  },
  UpdateFailed: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Failed to update resource',
  },
  DeletionFailed: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Failed to delete resource',
  },
};

export type TSuccessCode =
   'RequestSuccess'   |
   'LoginSuccess'     |
   'LogoutSuccess'    |
   'ResourceCreated'  |
   'DataUpdated'      |
   'CreatedSuccess'   |
   'ResourceDeleted'  |
   'OperationSuccess' |
   'ResourceUpdated'  ;

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
  ResourceDeleted: {
    statusCode: HttpStatus.OK,
    message: 'Resource deleted successfully',
  },
  ResourceUpdated: {
    statusCode: HttpStatus.OK,
    message: 'Resource Update successfully',
  },
  OperationSuccess: {
    statusCode: HttpStatus.OK,
    message: 'Operation completed successfully',
  },
};