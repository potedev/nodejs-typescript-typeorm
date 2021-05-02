import { entities } from '../../../../app/database/typeorm/entities'

import { AuthorRepo } from '../../AuthorRepo'
import { CreateAuthor } from './createAuthor'
import { CreateAuthorController } from './createAuthorController'

const authorRepo = new AuthorRepo(entities)
const createAuthor = new CreateAuthor(authorRepo)
const createAuthorController = new CreateAuthorController(createAuthor)

export { createAuthor, createAuthorController }