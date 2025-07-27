import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyCourseOrmEntity } from '../infrastructure/database/typeorms/entities/apply-course.orm';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyCourseOrmEntity])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}