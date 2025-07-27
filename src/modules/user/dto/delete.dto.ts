import { IsEmail, IsNotEmpty } from 'class-validator';

export class deleteUserDto{
    @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    email: string;

    @IsNotEmpty({ message: 'ชื่อผู้ใช้งานห้ามเว้นว่าง' })
    username: string;
}