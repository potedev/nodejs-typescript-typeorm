import { databaseCredentials } from './config'
import { entitiesArray } from './entities'
import { __prod__, NODE_ENV } from '../../../constant'

const typeORMConfig = databaseCredentials[NODE_ENV]
typeORMConfig.entities = entitiesArray

export { typeORMConfig }


