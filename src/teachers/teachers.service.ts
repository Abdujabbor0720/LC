import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { handleError } from 'src/lcs/utils/errorHandler';
import { resSuccess } from 'src/lcs/utils/resSuccess';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const newTeacher = await this.teacherRepo.save(createTeacherDto);
      return resSuccess(newTeacher, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const teachers = await this.teacherRepo.find({
        order: { createdAt: 'DESC' },
        relations: { bonuses: true },
      });
      return resSuccess(teachers);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const teacher = await this.teacherRepo.findOne({
        where: { id },
        relations: { bonuses: true },
      });
      if (!teacher) {
        throw new NotFoundException(`Teacher not found!`);
      }
      return resSuccess(teacher);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      await this.teacherRepo.update(id, updateTeacherDto);
      const teacher = await this.teacherRepo.findOne({
        where: { id },
        relations: { bonuses: true },
      });
      if (!teacher) {
        throw new NotFoundException(`Teacher not found!`);
      }
      return resSuccess(teacher);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const teacher = await this.teacherRepo.findOne({
        where: { id },
        relations: { bonuses: true },
      });
      if (!teacher) {
        throw new NotFoundException(`Teacher not found!`);
      }
      await this.teacherRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
