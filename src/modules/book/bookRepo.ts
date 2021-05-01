import { BookClass } from './book'
import { Book } from './bookEntity'
import { createDatabaseConnection } from '../../app/database/typeorm'

import { validate } from 'class-validator'

export interface IBookRepo {
    getBookById(UserlId: string): Promise<BookClass>;
    create(title: string): Promise<Book>;
}

export class BookRepo implements IBookRepo {
    private entities: any;

    constructor(entities: any) {

        createDatabaseConnection().then(_con => {
            this.entities = []

            this.entities.Book = _con.getRepository(entities.book)
        })
    }

    public async create(title: string): Promise<Book> {
        const BookEntity = this.entities.Book;

        const book = BookEntity.create({ title })

        return book
    }

    async save(book: BookClass): Promise<void> {
        const BookEntity = this.entities.Book;
        const exists = await this.exists(book.title);

        if (!exists) {
            // this.manager.save(book)
            BookEntity.save(book)
        }

        return;
    }

    public async exists(bookTitle: string): Promise<boolean> {
        const BookEntity = this.entities.Book;
        const result = await BookEntity.findOne({ title: bookTitle })
        return !!result === true;
    }

    public async getBooks(): Promise<BookClass[] | undefined> {
        const BookEntity = this.entities.Book;
        const result = await BookEntity.find()

        if (!result) return undefined

        return result
    }

    public async getBookById(bookId: string): Promise<BookClass> {
        const BookEntity = this.entities.Book;
        const book = await BookEntity.findOne({ id: bookId });
        if (!!book === false) throw new Error("Book not found");

        return book
    }

    // public async save(user: User) {

    // }

    // public async delete(user: User) {

    // }


}