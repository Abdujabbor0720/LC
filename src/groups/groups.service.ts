import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { LcsService } from 'src/lcs/lcs.service';
import { resSuccess } from 'src/lcs/utils/resSuccess';
import { handleError } from 'src/lcs/utils/errorHandler';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    private lcService: LcsService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      await this.lcService.findById(createGroupDto.lc);
      const newGroup = await this.groupRepo.save(createGroupDto);
      return resSuccess(newGroup);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const groups = await this.groupRepo.find({
        order: { createdAt: 'DESC' },
        relations: { lc: true },
      });
      return resSuccess(groups);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.groupRepo.findOne({
        where: { id },
        relations: { lc: true },
      });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      return resSuccess(group);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      await this.groupRepo.update(id, updateGroupDto);
      const group = await this.groupRepo.findOne({
        where: { id },
        relations: { lc: true },
      });
      if (!group) {
        throw new NotFoundException(`Group not found!`);
      }
      return resSuccess(group);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const group = await this.groupRepo.findOne({ where: { id } });
      if (!group) {
        throw new NotFoundException(`GroupNotFound!`);
      }
      await this.groupRepo.delete({ id });
      return resSuccess({});
    } catch (error) {
      handleError(error);
    }
  }
}
