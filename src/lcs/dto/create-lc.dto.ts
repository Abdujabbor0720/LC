import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLcDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
