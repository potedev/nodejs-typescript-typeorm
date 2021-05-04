import { IUserRepo } from '../../userRepo'
import { User } from '../../user'

//Errors handlers
import { validate } from 'class-validator'
import { parseError } from '../../../../utils/parseClassValidatorError'
import { Result } from '../../../../common/result'

//Equivalent to a specific service in a CRUD API
export class CreateUser {
    private userRepo: IUserRepo

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo
    }

    //This is what our use case will do
    public async execute(request: any) {

        try {

            let hashPassword;

            if (request.password && typeof request.password === 'string') {
                hashPassword = await User.hashPassword(request.password);
            }

            request.password = hashPassword

            const user = User.create(request)

            const errors = parseError(await validate(user))

            console.log('user validation error :', errors)

            if (errors) {
                return Result.fail(errors)
            }

            //Storing to our database with our ORM

            console.log('BEFORE SAVE USER', user);

            await this.userRepo.save(user)

            return Result.ok<User>(user)
        } catch (e) {
            return Result.fail(e)
        }
    }
}