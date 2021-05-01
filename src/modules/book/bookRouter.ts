import { Router } from 'express'

//Import the exported controller from the useCase index file (with the repo and service loaded into this controller)
import { createBookController } from './useCases/createBook/index'

const bookRouter = Router();

console.log('create book Controller instance class : ', createBookController)

bookRouter.post('/', (req, res) => createBookController.execute(req, res))

bookRouter.get('/', (req, res) => {
    console.log('hello here')
})

export { bookRouter }