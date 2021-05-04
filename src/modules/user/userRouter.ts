import { Router } from 'express'

import { createUserController } from './useCases/createUser'
import { loginController } from './useCases/login'
// import { authMiddleware } from '../../middlewares/auth'

const userRouter = Router();

userRouter.post('/', (req, res) => createUserController.execute(req, res))
userRouter.post('/login', (req, res) => loginController.execute(req, res))

export { userRouter }