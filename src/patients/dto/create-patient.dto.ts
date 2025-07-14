import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  ssn: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsPhoneNumber('IN') // Adjust region code as needed
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsNotEmpty()
  medicalHistory: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsOptional()
  medications?: string;

  @IsString()
  @IsOptional()
  insuranceProvider?: string;

  @IsString()
  @IsOptional()
  insurancePolicyNumber?: string;
}
