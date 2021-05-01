import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity } from 'typeorm'
import { Length } from "class-validator";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(10, 20)
    title!: string;
}