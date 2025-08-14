import { Lc } from "src/lcs/entities/lc.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne(() => Lc, (lc) => lc.groups)
    lc: Lc;

    @OneToMany(() => Student, (student) => student.group)
    students: Student[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
