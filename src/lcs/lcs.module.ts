import { Module } from '@nestjs/common';
import { LcsService } from './lcs.service';
import { LcsController } from './lcs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lc } from './entities/lc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lc])],
  controllers: [LcsController],
  providers: [LcsService],
  exports: [LcsService],
})
export class LcsModule {}
