import { PartialType } from '@nestjs/mapped-types';
import { CreateLcDto } from './create-lc.dto';

export class UpdateLcDto extends PartialType(CreateLcDto) {}
