import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { EducationStatus } from 'src/common//infrastructure/database/typeorms/entities/student-education';

export class AddEducationDto {
  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  field_of_study: string;

  @IsOptional() // Optional but must be a string if provided
  @IsString()
  current_occupation?: string;

  @IsNotEmpty()
  @IsInt()
  work_experience: number;

  @IsNotEmpty()
  @IsString()
  status: EducationStatus;
}