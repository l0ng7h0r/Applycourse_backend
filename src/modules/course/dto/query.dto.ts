import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dto/pagination.dto';

export class GetAllCategoryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}