import { createConnection } from 'typeorm'

import { __prod__, NODE_ENV } from '../../../constant'
import { databaseCredentials } from './config'

//Loaded entities
import { Book } from '../../../modules/book/bookEntity'

const mode = __prod__ === true ? "prod" : "dev"

//Loading our entities to the typeORM connection
const typeORMConfig = databaseCredentials[NODE_ENV]
typeORMConfig.entities = [Book]

export const createDatabaseConnection = async () => {
    console.log(`[DB]: Connecting to the database in ${mode} mode.`)
    const connection = await createConnection(typeORMConfig)
    return connection
}

export default createDatabaseConnection()