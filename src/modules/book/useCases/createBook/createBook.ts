import { IBookRepo } from '../../bookRepo'
import { Book } from '../../book'

//Errors handlers
import { validate } from 'class-validator'
import { parseError } from '../../../../utils/parseClassValidatorError'
import { Result } from '../../../../common/result'

//Equivalent to a specific service in a CRUD API
export class CreateBook {
    private bookRepo: IBookRepo

    constructor(bookRepo: IBookRepo) {
        this.bookRepo = bookRepo
    }

    //This is what our use case will do
    public async execute(request: any) {
        //Retrieve the author id
        //Request is like a body here
        //request.body.title

        try {
            const book = Book.create(request)

            const errors = parseError(await validate(book))

            console.log(errors)

            if (errors) {
                return Result.fail(errors)
            }

            //Storing to our database with our ORM
            await this.bookRepo.save(book)

            return Result.ok<Book>(book)
        } catch (e) {
            return Result.fail(e)
        }
    }
}