import { BookClass } from './book'
import { BookRepo } from './bookRepo'
import { validate } from 'class-validator'
import { Result } from '../../common/result'

console.log(Result);

export class BookService {
    private bookRepo: BookRepo

    constructor(bookRepo: BookRepo) {
        this.bookRepo = bookRepo
    }

    public index = async (): Promise<BookClass[] | undefined> => {
        return this.bookRepo.getBooks();
    }

    public create = async (title: string): Promise<BookClass | object> => {

        const book = await this.bookRepo.create(title)

        const errors = await validate(book);

        if (errors.length > 0) {
            console.log(errors);
            return Result(false, {}, errors,)

        } else {
            await this.bookRepo.save(book)
        }

        return Result(true, book)
    }

    public update = (id: string): string => {
        return `Book ${id} updated`
    }

    public delete = (id: string): string => {
        return `Book ${id} deleted`
    }
}
