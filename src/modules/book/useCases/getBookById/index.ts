import { entities } from '../../../../app/database/typeorm/entities'

import { BookRepo } from '../../bookRepo'
import { GetBookById } from './getBookById'
import { GetBookByIdController } from './getBookByIdController'

const bookRepo = new BookRepo(entities)
const getBookById = new GetBookById(bookRepo)
const getBookByIdController = new GetBookByIdController(getBookById)

export { getBookById, getBookByIdController }