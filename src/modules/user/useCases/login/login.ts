import { IUserRepo } from '../../userRepo'
import { User } from '../../user'
import { Result } from '../../../../common/result'
import { sign } from 'jsonwebtoken'
import randtoken from 'rand-token'

//Equivalent to a specific service in a CRUD API
export class Login {
    private userRepo: IUserRepo

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo
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

            let user;

            user = await this.userRepo.getUserByUsernameOrEmail(usernameOrEmail);

            const isCorrectPassword = await User.comparePassword(password, user.password)

            if (!isCorrectPassword) {
                return Result.fail({
                    field: 'Password',
                    message: 'Password is incorrect'
                })
            }

            console.log('found user :', user);

            //Sign a JWT with user ID

            //Create an access token with jwt token
            //Create a refresh token 
            //Add access token to response
            //Add refresh token to cookies
            //Store those data to redis

            const accessToken = sign({ userId: user.id }, "qsdqsd", { expiresIn: '15m' });
            const refreshToken = randtoken.uid(256);

            //TODO DTO login
            const resultUser = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            return Result.ok(resultUser)
        } catch (e) {
            return Result.fail(e.message)
        }
    }
}