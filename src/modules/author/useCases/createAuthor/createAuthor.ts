import { IAuthorRepo } from '../../authorRepo'
import { Author } from '../../author'

//Errors handlers
import { validate } from 'class-validator'
import { parseError } from '../../../../utils/parseClassValidatorError'
import { Result } from '../../../../common/result'

//Equivalent to a specific service in a CRUD API
export class CreateAuthor {
    private authorRepo: IAuthorRepo

    constructor(authorRepo: IAuthorRepo) {
        this.authorRepo = authorRepo
    }

    //This is what our use case will do
    public async execute(request: any) {
        //Retrieve the author id
        //Request is like a body here
        //request.body.title

        try {
            //On créé l'instance de notre class BOOK
            //Pour ensuite l'ajouter dans notre BDD avec notre ORM
            const author = Author.create(request)

            console.log('author class object', author);

            const errors = parseError(await validate(author))

            console.log(errors)

            if (errors) {
                return Result.fail(errors)
            }

            //Storing to our database with our ORM
            await this.authorRepo.save(author)

            return Result.ok<Author>(author)
        } catch (e) {
            return Result.fail(e)
        }
    }
}