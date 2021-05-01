import { Book } from './book'
import { Author } from './author'
import { User } from './user'

//Load here all entities you want in your API
//Array is used to tell typeorm which entities to load
const entitiesArray = [Book, User, Author]

//Entities object is used by our repos
const entities = { Book, User, Author }

export { entitiesArray, entities }