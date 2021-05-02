import { IAuthorRepo } from '../../authorRepo'
import { IBookRepo } from '../../../book/bookRepo'
import { Book } from '../../../book/book'

//Errors handlers
import { Result } from '../../../../common/result'

//Equivalent to a specific service in a CRUD API
export class AddBooksToAuthor {
    private authorRepo: IAuthorRepo
    private bookRepo: IBookRepo

    constructor(authorRepo: IAuthorRepo, bookRepo: IBookRepo) {
        this.authorRepo = authorRepo
        this.bookRepo = bookRepo
    }

    //This is what our use case will do
    public async execute(request: any) {
        try {
            const { books, authorId } = request

            // let books = []

            const fetchedBooks = await Promise.all(books.map(async (bookId: string) => await this.bookRepo.getBookById(bookId)));

            console.log('Books created class : ', fetchedBooks)
            console.log('Author id : ', authorId)

            //TODO
        } catch (e) {
            return Result.fail(e)
        }
    }
}