import { Router } from 'express'

//Import the exported controller from the useCase index file (with the repo and service loaded into this controller)
import { createAuthorController } from './useCases/createAuthor/index'
import { addBooksToAuthorController } from './useCases/addBooksToAuthor/index'

const authorRouter = Router();

console.log('create Author Controller instance class : ', createAuthorController)

authorRouter.post('/', (req, res) => createAuthorController.execute(req, res))

// /api/v1/authors/:id/books
authorRouter.post('/:id/books', (req, res) => addBooksToAuthorController.execute(req, res))

export { authorRouter }