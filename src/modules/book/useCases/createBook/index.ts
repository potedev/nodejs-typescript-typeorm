import { entities } from '../../../../app/database/typeorm/entities'

import { CreateBook } from './createBook'
//Maybe we will need a author repo
import { BookRepo } from '../../bookRepo'
import { CreateBookController } from './createBookController'

console.log('entities :', entities);

const bookRepo = new BookRepo(entities)
const createBook = new CreateBook(bookRepo)
const createBookController = new CreateBookController(createBook)

export { createBook, createBookController }