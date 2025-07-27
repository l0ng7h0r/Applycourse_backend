import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}