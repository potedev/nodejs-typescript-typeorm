import { Book } from './book'

export interface IBookRepo {
    exists(bookId: string): Promise<boolean>;
    save(book: Book): Promise<void>;
    getBookById(id: string): Promise<Book>;
}

export class BookRepo implements IBookRepo {
    private entities: any

    constructor(entities: any) {
        this.entities = entities

        console.log('current book repo entities', this.entities)
    }

    public async exists(bookTitle: string): Promise<boolean> {
        const BookEntity = this.entities.Book;

        const result = await BookEntity.findOne({ title: bookTitle })

        console.log('exists result ', result)

        return !!result === true;
    }


    public async getBookById(bookId: string): Promise<Book> {
        const BookEntity = this.entities.Book;
        const book = await BookEntity.find({ where: { id: bookId } });
        const found = book.length > 0
        if (!found) throw new Error("Book not found");

        return book
    }

    async save(book: Book): Promise<void> {

        const BookEntity = this.entities.Book;

        console.log('repo book props', book);

        const exists = await this.exists(book.title);

        if (!exists) {
            BookEntity.save(book)
        }

        return;
    }
}