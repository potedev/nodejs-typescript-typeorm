import { Router } from 'express'

import { userRouter } from '../../modules/user/userRouter'
import { bookRouter } from '../../modules/book/bookRouter'
import { authorRouter } from '../../modules/author/authorRouter'

import { authMiddleware } from '../../middlewares/auth'
import { isAuth } from '../../middlewares/auth/index'

const v1Router: Router = Router();

v1Router.get('/', isAuth, (req, res) => {

    console.log('req', req.user)
    console.log('req redis', req.redis);

    return res.json({ message: "Yeah, it's up !" });
})

v1Router.use('/users', userRouter);
v1Router.use('/books', bookRouter);
v1Router.use('/authors', authorRouter);

export { v1Router }