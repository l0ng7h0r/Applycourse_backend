import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { StudentOrmEntity } from './student.orm';

export enum EducationStatus {
  STUDYING = 'studying',
  GRADUATED = 'graduated',
}

@Entity('student_educations')
export class StudentEducationOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  student_id?: number | null;

  @ManyToOne(() => StudentOrmEntity, (student) => student.educations)
  @JoinColumn({ name: 'student_id' })
  student: StudentOrmEntity;

  @Column({ type: 'varchar', length: 255 })
  level: string;

  @Column({ type: 'varchar', length: 255 })
  field_of_study: string;

  @Column({ type: 'varchar', length: 255 })
  current_occupation: string;

  @Column({ type: 'int', unsigned: true })
  work_experience: number;

  @Column({ type: 'enum', enum: EducationStatus })
  status: EducationStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date | null;
}