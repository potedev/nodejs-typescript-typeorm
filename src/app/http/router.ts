import { Router } from 'express'
import { bookRouter } from '../../modules/book/bookRouter'
import { authorRouter } from '../../modules/author/authorRouter'

const v1Router: Router = Router();

v1Router.get('/', (_, res) => {
    return res.json({ message: "Yeah, it's up !" });
})

v1Router.use('/books', bookRouter);
v1Router.use('/authors', authorRouter);

export { v1Router }