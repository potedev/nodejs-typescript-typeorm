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

            if (!result.isSuccess) {
                return this.clientError(res, undefined, result.error)
            }

            const user: any = result.getValue();

            res.cookie(
                "access_token",
                user.accessToken,
                { maxAge: 900000, httpOnly: true }
            );

            res.cookie(
                "refresh_token",
                user.refreshToken,
                { maxAge: 900000, httpOnly: true }
            );

            const { refreshToken, accessToken, ...userWithoutAccessAndRefreshToken } = user

            return this.ok(res, userWithoutAccessAndRefreshToken)
        }
        catch (err) {
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
        }
    }
}