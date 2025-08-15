import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBonusDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  description: string;

  teacher: any;
}
