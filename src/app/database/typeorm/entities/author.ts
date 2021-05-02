import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Book } from "./book";

@Entity()
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Book, photo => photo.author)
    books: Book[];
}
