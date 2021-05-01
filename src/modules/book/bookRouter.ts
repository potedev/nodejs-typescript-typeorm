import { Router } from 'express'
import { BookController } from './bookController'

export class BookRouter {
    private bookController: BookController
    router: Router | any

    constructor(bookController: BookController) {
        this.bookController = bookController
        this.router = Router()

        this.initRoutes()

        return this.router
    }

    private initRoutes() {
        this.router.get('/', this.bookController.index)
        this.router.post('/', (req, res) => this.bookController.create(req, res))
        this.router.put('/:id', this.bookController.update)
        this.router.delete('/:id', this.bookController.delete)
    }
}