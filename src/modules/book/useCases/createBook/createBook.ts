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
            //On créé l'instance de notre class BOOK
            //Pour ensuite l'ajouter dans notre BDD avec notre ORM

            console.log('book create use case props', request);

            const book = Book.create(request)

            console.log('book class object', book);

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