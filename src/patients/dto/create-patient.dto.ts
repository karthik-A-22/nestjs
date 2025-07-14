import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ssn: string;

  @IsString()
  @IsNotEmpty()
  medicalHistory: string;
}
