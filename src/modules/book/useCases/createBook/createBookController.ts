import { CreateBook } from './createBook'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class CreateBookController extends BaseController {
    private useCase: CreateBook;

    constructor(useCase: CreateBook) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        //Get body with req.body

        const bookProps = {
            title: req.body.title
        }

        try {
            //Execute method from our createBook useCase
            const result = await this.useCase.execute(bookProps)

            //Notify the client by throwing a correct status according to result

            console.log('Controller result', result)
        }
        catch (err) {
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
        }
    }
}