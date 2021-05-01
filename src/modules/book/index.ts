import { Book } from './bookEntity'

import { BookRepo } from './bookRepo'
import { BookController } from './bookController'
import { BookService } from './bookService'
import { BookRouter } from './bookRouter'

const bookRepo = new BookRepo({ book: Book })
const bookService = new BookService(bookRepo)
const bookController = new BookController(bookService)
const bookRouter = new BookRouter(bookController)

export default bookRouter