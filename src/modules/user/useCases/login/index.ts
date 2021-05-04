import { entities } from '../../../../app/database/typeorm/entities'

import { UserRepo } from '../../userRepo'
import { Login } from './login'
import { LoginController } from './loginController'

const userRepo = new UserRepo(entities)
const login = new Login(userRepo)
const loginController = new LoginController(login)

export { login, loginController }