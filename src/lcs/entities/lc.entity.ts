import { Group } from 'src/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lcs')
export class Lc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Group, (group) => group.lc, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  groups: Group[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
