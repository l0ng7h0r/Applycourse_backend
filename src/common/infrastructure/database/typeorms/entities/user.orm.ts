import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  // OneToMany,
} from 'typeorm';
import { TeacherOrmEntity } from './teacher.orm';
import { StudentOrmEntity } from './student.orm';
// import { RoleUserOrmEntity } from './role-user';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @OneToOne(() => StudentOrmEntity, (student) => student.user)
  student: StudentOrmEntity;

  @OneToMany(() => TeacherOrmEntity, (teacher) => teacher.user)
  teachers: TeacherOrmEntity[];
}