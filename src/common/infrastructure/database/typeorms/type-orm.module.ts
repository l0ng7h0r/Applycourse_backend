import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './entities/user.orm';
import { UsersSeeder } from './seeders/user.seed';
import { SeederService } from './seeders/seeder.service';
import { TransactionModule } from '../../transaction/transaction.module';
import { StudentOrmEntity } from './entities/student.orm';
import { StudentEducationOrmEntity } from './entities/student-education';
import { CourseCategoryOrmEntity } from './entities/course_categories';
import { TeacherOrmEntity } from './entities/teacher.orm';
import { CourseOrmEntity } from './entities/course.orm';
import { ApplyCourseOrmEntity } from './entities/apply-course.orm';


@Global()
@Module({ // ຖ້າເຮົາມີ typemodle ຕ້ອງໃສ່ @Modle({.....}) fiel ໂຕນີ້ແມ່ນໃຊ້ connect ກັບ database
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TransactionModule, // ນຳໃຊ້ TransactionModule ສໍາລັບ TransactionManager
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [UserOrmEntity, StudentOrmEntity, StudentEducationOrmEntity, TeacherOrmEntity, CourseCategoryOrmEntity, CourseOrmEntity, ApplyCourseOrmEntity],
        subscribers: [],
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        logging: configService.getOrThrow('DB_LOGGING') === 'true',
        migrationsTableName: 'migrations',
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity, StudentOrmEntity, StudentEducationOrmEntity, TeacherOrmEntity, CourseCategoryOrmEntity, CourseOrmEntity, ApplyCourseOrmEntity]), // ຖ້າບໍ່ໃຊ້ອັນນີ້ຈະບໍ່ສາມາດເອີ້ນໃຊ້ Repository<User>
  ],
  exports: [TypeOrmModule],
  providers: [UsersSeeder, SeederService],
})
export class TypeOrmRepositoryModule {}