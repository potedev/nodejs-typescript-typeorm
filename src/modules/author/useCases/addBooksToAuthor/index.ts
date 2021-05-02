import { entities } from '../../../../app/database/typeorm/entities'

import { AuthorRepo } from '../../AuthorRepo'
import { BookRepo } from '../../../book/bookRepo'
import { AddBooksToAuthor } from './addBooksToAuthor'
import { AddBooksToAuthorController } from './AddBooksToAuthorController'

const authorRepo = new AuthorRepo(entities)
const bookRepo = new BookRepo(entities)
const addBooksToAuthor = new AddBooksToAuthor(authorRepo, bookRepo)
const addBooksToAuthorController = new AddBooksToAuthorController(addBooksToAuthor)

export { addBooksToAuthorController, AddBooksToAuthor }