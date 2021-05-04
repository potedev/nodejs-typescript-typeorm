import { CreateUser } from './createUser'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class CreateUserController extends BaseController {
    private useCase: CreateUser;

    constructor(useCase: CreateUser) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        //Get body with req.body

        const { username, email, password, lastname, firstname } = req.body

        const userProps = {
            username,
            email,
            password,
            lastname,
            firstname
        }

        try {
            //Execute method from our createUser useCase
            const result = await this.useCase.execute(userProps)

            //Notify the client by throwing a correct status according to result
            console.log('Controller result', result)

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