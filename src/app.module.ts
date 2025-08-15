import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LcsModule } from './lcs/lcs.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { BonusesModule } from './bonuses/bonuses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:1725@localhost:5432/one',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LcsModule,
    GroupsModule,
    StudentsModule,
    TeachersModule,
    BonusesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
