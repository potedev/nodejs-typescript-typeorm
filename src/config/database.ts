import { __prod__, DB_DIALECT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } from '../constant'

// TypeORM configuration
const typeORMConfig = {
    type: DB_DIALECT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: !__prod__,
    synchronize: true,
    entities: [] as any[]
}

export default typeORMConfig