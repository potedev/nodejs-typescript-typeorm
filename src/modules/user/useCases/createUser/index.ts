import { entities } from '../../../../app/database/typeorm/entities'

import { UserRepo } from '../../userRepo'
import { CreateUser } from './createUser'
import { CreateUserController } from './createUserController'

const userRepo = new UserRepo(entities)
const createUser = new CreateUser(userRepo)
const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }