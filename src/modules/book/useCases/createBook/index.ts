import { entities } from '../../../../app/database/typeorm/entities'

import { BookRepo } from '../../bookRepo'
import { CreateBook } from './createBook'
import { CreateBookController } from './createBookController'

const bookRepo = new BookRepo(entities)
const createBook = new CreateBook(bookRepo)
const createBookController = new CreateBookController(createBook)

export { createBook, createBookController }