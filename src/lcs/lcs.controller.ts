import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LcsService } from './lcs.service';
import { CreateLcDto } from './dto/create-lc.dto';
import { UpdateLcDto } from './dto/update-lc.dto';

@Controller('lcs')
export class LcsController {
  constructor(private readonly lcsService: LcsService) {}

  @Post()
  create(@Body() createLcDto: CreateLcDto) {
    return this.lcsService.create(createLcDto);
  }

  @Get()
  findAll() {
    return this.lcsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lcsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLcDto: UpdateLcDto) {
    return this.lcsService.update(+id, updateLcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lcsService.remove(+id);
  }
}
