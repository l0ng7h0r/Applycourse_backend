import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TransactionModule } from '../../common/infrastructure/transaction/transaction.module';
import { TeacherOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/teacher.orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherOrmEntity]), // For repository injection
    TransactionModule, // For transaction service injection
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService], // Optional: if you want to use TeacherService in other modules
})
export class TeacherModule {}