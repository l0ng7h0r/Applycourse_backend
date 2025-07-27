import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseCategoryDto } from './dto/create.dto';
import { UpdateCourseCategoryDto } from './dto/update.dto';
import { GetAllCategoryDto } from './dto/query.dto';
import {
  CourseOrmEntity,
  CourseStatus,
} from 'src/common/infrastructure/database/typeorms/entities/course.orm';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-coure.dto';
import { PaginatedResponse } from 'src/common/pagination/respone.pagination';
import { paginateQueryBuilder } from 'src/common/utils/pagition.builder';
import { CourseCategoryOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/course_categories';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseCategoryOrmEntity)
    private _courseCategory: Repository<CourseCategoryOrmEntity>,
    @InjectRepository(CourseOrmEntity)
    private _course: Repository<CourseOrmEntity>,
  ) {}

  /**course*/

  async getAll(query: any): Promise<PaginatedResponse<CourseOrmEntity>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    
    const queryBuiler = this._course.createQueryBuilder('course')
    .leftJoinAndSelect('course.teacher', 'teacher')
    .leftJoinAndSelect('course.category', 'category');

    return paginateQueryBuilder(queryBuiler, page, limit);
  }

  /** CRUD Course */
  async createCourse(body: CreateCourseDto): Promise<CourseOrmEntity> {
    try {
      const course = this._course.create({
        teacher_id: body.teacher_id,
        category_id: body.category_id,
        title: body.title,
        max_student: body.max_student,
        duration_hours: body.duration_hours,
        price: body.price,
        registration_start_date: new Date(body.register_start_date),
        registration_end_date: new Date(body.register_end_date),
        start_date: new Date(body.start_date),
        end_date: new Date(body.end_date),
        description: body.description,
        status: CourseStatus.OPEN,
      });

      const savedCourse = await this._course.save(course);
      return savedCourse;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw new Error('Unable to create course');
    }
  }

  async updateCourse(
    id: number,
    body: UpdateCourseDto,
  ): Promise<CourseOrmEntity> {
    try {
      const course = await this._course.findOne({
        where: { id: id },
      });
      if (!course) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }

      course.teacher_id = body.teacher_id;
      course.category_id = body.category_id;
      course.title = body.title;
      course.max_student = body.max_student;
      course.duration_hours = body.duration_hours;
      course.price = body.price;
      course.registration_start_date = new Date(body.register_start_date);
      course.registration_end_date = new Date(body.register_end_date);
      course.start_date = new Date(body.start_date);
      course.end_date = new Date(body.end_date);
      course.description = body.description;
      course.status = CourseStatus.OPEN;

      const updatedCourse = await this._course.save(course);
      return updatedCourse;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw error; // ເພີ່ອັນນີ້ເຂົ້າໄປ
    }
  }

  async deleteCourse(id: number): Promise<void> {
    const result = await this._course.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  /** CRUD Course Category */
  async getAllCategory(
    query: GetAllCategoryDto,
  ): Promise<PaginatedResponse<CourseCategoryOrmEntity>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const queryBuilder = this._courseCategory.createQueryBuilder('category');

    return paginateQueryBuilder(queryBuilder, page, limit);
  }

  async createCategory(
    body: CreateCourseCategoryDto,
  ): Promise<CourseCategoryOrmEntity> {
    const checkName = await this._courseCategory.findOne({
      where: { name: body.name },
    });
    if (checkName) {
      throw new BadRequestException('The name is already exists');
    }

    const createCatgory = this._courseCategory.create({
      name: body.name,
    });

    return await this._courseCategory.save(createCatgory);
  }

  async updateCategory(
    id: number,
    body: UpdateCourseCategoryDto,
  ): Promise<CourseCategoryOrmEntity> {
    const courseCateg = await this._courseCategory.findOne({
      where: { id },
    });
    if (!courseCateg) {
      throw new BadRequestException(`The course category id ${id} not found.`);
    }
    courseCateg.name = body.name ?? courseCateg.name;

    return await this._courseCategory.save(courseCateg);
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this._courseCategory.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Student Education with ID ${id} not found`);
    }
  }

  /** update status */

  updateStatus = async (id: number , body: StatusDto): Promise<void> => {
    const course = await this._course.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    course.status = body.status as CourseStatus ?? course.status;
    await this._course.save(course);
  };
}

// ຕັດອອກ ໄປໃສ່ student service ເເລະ ເອົາບາງອັນບໍ່ໃຊ້ອອກ