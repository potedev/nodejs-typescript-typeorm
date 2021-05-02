import { AddBooksToAuthor } from './addBooksToAuthor'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class AddBooksToAuthorController extends BaseController {
    private useCase: AddBooksToAuthor;

    constructor(useCase: AddBooksToAuthor) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        //Get body with req.body

        const { books } = req.body
        const { id } = req.params

        const addBooksToAuthorProps = {
            books,
            authorId: id
        }

        console.log('props', addBooksToAuthorProps)

        try {
            //Execute method from our createAuthor useCase
            const result = await this.useCase.execute(addBooksToAuthorProps)

            //Notify the client by throwing a correct status according to result
            console.log('Controller author add book result', result)

            if (!result.isSuccess) {
                this.clientError(res, undefined, result.error)
            }

            return this.created(res)
        }
        catch (err) {
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
        }
    }
}