import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly username?: string;
  
    @IsOptional()
    @IsEmail()
    readonly email?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(6)
    readonly password?: string;
  
    @IsOptional()
    @IsEnum(['admin', 'user'])
    readonly role?: string;
  }