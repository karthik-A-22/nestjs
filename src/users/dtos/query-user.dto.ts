import { IsEnum, IsOptional, IsString } from 'class-validator';
export class QueryUserDto {
  @IsOptional()
  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Role must be one of INTERN, ENGINEER, ADMIN',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  department?: string;
}
