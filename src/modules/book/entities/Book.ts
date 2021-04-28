import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity } from 'typeorm'

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    title!: string;
}