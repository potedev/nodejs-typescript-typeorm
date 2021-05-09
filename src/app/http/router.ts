import { Router } from 'express'

import { userRouter } from '../../modules/user/userRouter'
import { bookRouter } from '../../modules/book/bookRouter'
import { authorRouter } from '../../modules/author/authorRouter'

import { authMiddleware } from '../../middlewares/auth'

const v1Router: Router = Router();

v1Router.get('/', (req, res, next) => authMiddleware.checkCredentials(req, res, next), (req, res) => {

    console.log('req user is here ?', req.user)

    return res.json({ message: "Yeah, it's up !" });
})

v1Router.use('/users', userRouter);
v1Router.use('/books', bookRouter);
v1Router.use('/authors', authorRouter);

export { v1Router }