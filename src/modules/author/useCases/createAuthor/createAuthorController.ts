import { CreateAuthor } from './createAuthor'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class CreateAuthorController extends BaseController {
    private useCase: CreateAuthor;

    constructor(useCase: CreateAuthor) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        //Get body with req.body

        const { name, books } = req.body

        const AuthorProps = {
            name,
            books
        }

        try {
            //Execute method from our createAuthor useCase
            const result = await this.useCase.execute(AuthorProps)

            //Notify the client by throwing a correct status according to result
            console.log('Controller author result', result)

            if (!result.isSuccess) {
                return this.clientError(res, undefined, result.error)
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