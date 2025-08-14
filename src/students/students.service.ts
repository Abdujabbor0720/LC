import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { handleError } from 'src/lcs/utils/errorHandler';
import { resSuccess } from 'src/lcs/utils/resSuccess';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private groupService: GroupsService
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    try {
      await this.groupService.findOne(createStudentDto.group);
      const newStudent = await this.studentRepo.save(createStudentDto);
      return resSuccess(newStudent, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const students = await this.studentRepo.find({ order: { createdAt: 'DESC' }, relations: { group: true } });
      return resSuccess(students);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const student = await this.studentRepo.findOne({ where: { id }, relations: { group: true } });
      if (!student) {
        throw new NotFoundException(`Student not found!`);
      }
      return resSuccess(student)
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      await this.studentRepo.update(id, updateStudentDto);
      const student = await this.studentRepo.findOne({ where: { id }, relations: { group: true } });
      if (!student) {
        throw new NotFoundException(`Student not found!`);
      }
      return resSuccess(student);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepo.findOne({ where: { id }, relations: { group: true } });
      if (!student) {
        throw new NotFoundException(`Student not found!`);
      }
      await this.studentRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
