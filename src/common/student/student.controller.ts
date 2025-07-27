import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly _studentService: StudentService) {}
  /** Create Apply Course */
  @Post('apply-course')
  async applyCourse(@CurrentUser() user: any, @Body() body: any): Promise<any> {
    return await this._studentService.applyCourse(user.id, body);
  }

  /** Student */
  @Get('my-apply-course')
  async myApplyCourse(@CurrentUser() user: any): Promise<any> {
    return await this._studentService.myApplyCourse(user.id);
  }
}