import {
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @IsDateString() // ตรวจว่าเป็นวันที่ถูกต้องตาม ISO8601 เช่น '1992-01-01'
  @IsNotEmpty()
  birth_date: string;

  @IsIn(['male', 'female']) // หรือกำหนด enum ก็ได้
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}