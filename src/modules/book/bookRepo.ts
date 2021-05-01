import { Book } from './book'

export interface IBookRepo {
    exists(bookId: string): Promise<boolean>;
    save(book: Book): Promise<void>;
}

export class BookRepo {
    private entities: any

    constructor(entities: any) {
        this.entities = entities

        console.log('current book repo entities', this.entities)
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

    public async exists(bookTitle: string): Promise<boolean> {
        const BookEntity = this.entities.Book;

        const result = await BookEntity.findOne({ title: bookTitle })

        console.log('exists result ', result)

        return !!result === true;
    }
}