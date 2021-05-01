import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity, ManyToOne } from 'typeorm'
import { Author } from './author'

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

    @ManyToOne(() => Author, author => author.books)
    author: Author
}