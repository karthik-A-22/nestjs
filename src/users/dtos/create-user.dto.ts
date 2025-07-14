import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsNotEmpty()
  password: string;

  @IsEnum(['DOCTOR', 'PATIENT', 'ADMIN'], {
    message: 'Role must be one of DOCTOR, PATIENT, or ADMIN',
  })
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';

  @IsOptional()
  @IsPhoneNumber('IN', { message: 'Invalid phone number' })
  phone?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;
}
