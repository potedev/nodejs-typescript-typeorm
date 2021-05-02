import { GetBookById } from './getBookById'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class GetBookByIdController extends BaseController {
    private useCase: GetBookById;

    constructor(useCase: GetBookById) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        const { id } = req.params

        try {
            //Execute method from our createBook useCase
            const result = await this.useCase.execute({ id })

            if (!result.isSuccess) {
                return this.clientError(res, undefined, result.error)
            }

            return this.ok(res, result.getValue())
        }
        catch (err) {
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
            //TODO controller error
        }
    }
}