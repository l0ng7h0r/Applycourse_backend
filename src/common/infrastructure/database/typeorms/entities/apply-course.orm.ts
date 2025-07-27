import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseOrmEntity } from './course.orm';
import { StudentOrmEntity } from './student.orm';

export enum ApplyCourseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity({ name: 'apply_courses' })
export class ApplyCourseOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  course_id: number;

  @Column({ unsigned: true })
  student_id: number;

  @Column('double precision', { unsigned: true })
  price: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: ApplyCourseStatus,
    default: ApplyCourseStatus.PENDING,
  })
  status: ApplyCourseStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  // Optional: Relations
  @ManyToOne(() => CourseOrmEntity, (course) => course.applyCourses)
  @JoinColumn({ name: 'course_id' })
  course: CourseOrmEntity;

  @ManyToOne(() => StudentOrmEntity, (student) => student.applyCourses)
  @JoinColumn({ name: 'student_id' })
  student: StudentOrmEntity;
}