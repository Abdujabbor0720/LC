import { Bonus } from 'src/bonuses/entities/bonus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'integer' })
  experience: number;

  @OneToMany(() => Bonus, (bonus) => bonus.teacher, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bonuses: Bonus[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
