import { Router } from 'express'

//Import the exported controller from the useCase index file (with the repo and service loaded into this controller)
import { createBookController } from './useCases/createBook/index'
import { getBookByIdController } from './useCases/getBookById/index'

const bookRouter = Router();

bookRouter.post('/', (req, res) => createBookController.execute(req, res))
bookRouter.get('/:id', (req, res) => getBookByIdController.execute(req, res))

export { bookRouter }