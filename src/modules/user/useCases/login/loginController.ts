import { Login } from './login'
import { Request, Response } from 'express'
import { BaseController } from '../../../../common/baseController';

export class LoginController extends BaseController {
    private useCase: Login;

    constructor(useCase: Login) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: Request, res: Response): Promise<void | any> {
        //Get body with req.body

        const { identifier, password } = req.body

        const loginProps = {
            usernameOrEmail: identifier, password,
        }

        try {
            //Execute method from our createUser useCase
            const result = await this.useCase.execute(loginProps)

            //Notify the client by throwing a correct status according to result
            console.log('Controller result', result)

            if (!result.isSuccess) {
                return this.clientError(res, undefined, result.error)
            }

            const user = result.getValue();

            res.cookie("jid", user.refreshToken, {
                httpOnly: true,
                path: "/refresh_token"
            });


            const { refreshToken, ...userWithoutRefreshToken } = user

            return this.ok(res, userWithoutRefreshToken)
        }
        catch (err) {
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
        }
    }
}