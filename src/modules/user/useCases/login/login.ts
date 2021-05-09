import { IUserRepo } from '../../userRepo'
import { User } from '../../user'
import { Result } from '../../../../common/result'
import { sign, verify } from 'jsonwebtoken'
import randtoken from 'rand-token'

import { AUTH_SECRET } from '../../../../constant'

//Equivalent to a specific service in a CRUD API
export class Login {
    private userRepo: IUserRepo
    private authService: any

    constructor(userRepo: IUserRepo, authService: any) {
        this.userRepo = userRepo
        this.authService = authService
    }

    //This is what our use case will do
    public async execute(request: any) {

        try {

            const { usernameOrEmail, password } = request

            //throw errors

            if (typeof usernameOrEmail !== "string") {
                return Result.fail({
                    field: 'username or email',
                    message: 'username or email invalid'
                })
            }

            if (usernameOrEmail === "") {
                return Result.fail({
                    field: 'username or email',
                    message: 'username or email is required'
                })
            }

            if (typeof password !== "string") {
                return Result.fail({
                    field: 'Password',
                    message: 'Password invalid'
                })
            }

            if (password === "") {
                return Result.fail({
                    field: 'Password',
                    message: 'Password is required'
                })
            }

            let user: any;

            user = await this.userRepo.getUserByUsernameOrEmail(usernameOrEmail);

            const isCorrectPassword = await User.comparePassword(password, user.password)

            if (!isCorrectPassword) {
                return Result.fail({
                    field: 'Password',
                    message: 'Password is incorrect'
                })
            }

            const xsrfToken = this.authService.createXsrfToken();

            const payload = {
                username: user.username,
                email: user.email,
                userId: user.id,
                xsrfToken: xsrfToken
            }

            const accessToken = this.authService.signJWT(payload);
            const refreshToken = this.authService.createRefreshToken();

            //TODO DTO login
            const resultUser = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                xsrfToken
            }

            console.log('login use case result user', resultUser);

            this.authService.saveAuthenticatedUser({ username: user.username, refreshToken: refreshToken, token: accessToken, xsrfToken: xsrfToken })

            return Result.ok(resultUser)
        } catch (e) {
            return Result.fail(e.message)
        }
    }
}