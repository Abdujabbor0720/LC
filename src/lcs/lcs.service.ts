import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLcDto } from './dto/create-lc.dto';
import { UpdateLcDto } from './dto/update-lc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lc } from './entities/lc.entity';
import { Repository } from 'typeorm';
import { handleError } from './utils/errorHandler';
import { resSuccess } from './utils/resSuccess';

@Injectable()
export class LcsService {
  constructor(@InjectRepository(Lc) private lcRepo: Repository<Lc>) { }

  async create(createLcDto: CreateLcDto) {
    try {
      const newLc = await this.lcRepo.save(createLcDto);
      return resSuccess(newLc, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const lcs = await this.lcRepo.find({
        order: { createdAt: 'DESC' },
        relations: ['groups']
      });
      return resSuccess(lcs);
    } catch (error) {
      handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const lc = await this.lcRepo.findOne({ where: { id }, relations: { groups: true } });
      if (!lc) {
        throw new NotFoundException(`Learning Center not found!`);
      }
      return resSuccess(lc);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateLcDto: UpdateLcDto) {
    try {
      await this.lcRepo.update(id, updateLcDto);
      const lc = await this.lcRepo.findOne({ where: { id }, relations: { groups: true } });
      if (!lc) {
        throw new NotFoundException(`Learning Center not found`);
      }
      return resSuccess(lc);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const lc = await this.lcRepo.findOne({ where: { id } });
      if (!lc) {
        throw new NotFoundException(`Learning Center not found`);
      }
      await this.lcRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
