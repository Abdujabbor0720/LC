import { Module } from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { BonusesController } from './bonuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonus } from './entities/bonus.entity';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus]), TeachersModule],
  controllers: [BonusesController],
  providers: [BonusesService],
})
export class BonusesModule {}
