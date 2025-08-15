import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsNumber()
  @IsNotEmpty()
  experience: number;
}
