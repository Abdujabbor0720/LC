import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bonuses')
export class Bonus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column('text')
  description: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.bonuses, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
