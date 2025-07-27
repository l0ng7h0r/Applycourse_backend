import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TeacherOrmEntity } from './teacher.orm';
import { CourseCategoryOrmEntity } from './course_categories';
import { ApplyCourseOrmEntity } from './apply-course.orm';

export enum CourseStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

@Entity('courses')
export class CourseOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint' , unsigned: true })
  teacher_id: number;

  @Column({ type: 'bigint' , unsigned: true })
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int', unsigned: true })
  max_student: number;

  @Column({ type: 'int', unsigned: true })
  duration_hours: number;

  @Column({ type: 'double precision', unsigned: true })
  price: number;

  @Column({ type: 'date' })
  registration_start_date: Date;

  @Column({ type: 'date' })
  registration_end_date: Date;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: CourseStatus,
  })
  status: CourseStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => TeacherOrmEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherOrmEntity;

  @ManyToOne(() => CourseCategoryOrmEntity, (category) => category.courses)
  @JoinColumn({ name: 'category_id' })
  category: CourseCategoryOrmEntity;

  @OneToMany(() => ApplyCourseOrmEntity, (apply) => apply.course)
  applyCourses: ApplyCourseOrmEntity[];
}