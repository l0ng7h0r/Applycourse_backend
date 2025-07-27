import { DataSource } from 'typeorm';
import { config } from 'dotenv'; // dotenv ສໍາລັບໂຫຼດຕົວແປໃນ .env
import { UserOrmEntity } from './typeorms/entities/user.orm';
import { StudentOrmEntity } from './typeorms/entities/student.orm';
import { StudentEducationOrmEntity } from './typeorms/entities/student-education';
import { CourseCategoryOrmEntity } from './typeorms/entities/course_categories';
import { TeacherOrmEntity } from './typeorms/entities/teacher.orm';
import { CourseOrmEntity } from './typeorms/entities/course.orm';
import { ApplyCourseOrmEntity } from './typeorms/entities/apply-course.orm';

config(); // ໂຫຼດຈາກ .env
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'long1122',
  database: process.env.DB_NAME || 'nestjs_backend',
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
  logging: Boolean(process.env.DB_LOGGING || false),
  entities: [UserOrmEntity, StudentOrmEntity, StudentEducationOrmEntity, TeacherOrmEntity, CourseCategoryOrmEntity, CourseOrmEntity, ApplyCourseOrmEntity], // ເພີ່ມ  entities ທີ່ຈະໃຊ້
  migrations: [__dirname + '/migrations//*{.ts,.js}'],
  migrationsTableName: 'migrations', // ຊື່ table ສຳຫຼັບເກັບ migrations
});



