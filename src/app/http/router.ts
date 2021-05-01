import { Router } from 'express'
import bookRouter from '../../modules/book'

const v1Router = Router();

v1Router.get('/', (_, res) => {
    return res.json({ message: "Yeah, it's up !" });
})

//TODO fix Typescript type of bookRouter
//He's waiting for express.Router type, he got a class instead
v1Router.use('/books', bookRouter);

export { v1Router }

// export class apiRouter {
//     private router: any

//     constructor() {
//         this.router = Router()

//         this.initRoutes()

//         return this.router
//     }

//     initRoutes() {
//         this.router.use('/books', bookRouter)
//     }
// }




