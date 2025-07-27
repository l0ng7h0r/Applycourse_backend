import {
  IsInt,
  IsString,
  IsDateString,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class UpdateCourseDto {
  @IsInt()
  @IsNotEmpty()
  teacher_id: number;

  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  max_student: number;

  @IsInt()
  @IsNotEmpty()
  duration_hours: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  register_start_date: string;

  @IsDateString()
  @IsNotEmpty()
  register_end_date: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  description: string;
}