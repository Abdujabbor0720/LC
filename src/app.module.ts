import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LcsModule } from './lcs/lcs.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:1725@localhost:5432/n17',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LcsModule,
    GroupsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
