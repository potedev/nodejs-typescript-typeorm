import { __prod__, DB_HOST, DB_DIALECT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } from '../../../constant'

const databaseCredentials = {
    development: {
        type: DB_DIALECT,
        database: DB_DATABASE,
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities: [] as any[]
    },
    test: {
        type: DB_DIALECT,
        database: DB_DATABASE,
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities: [] as any[]
    },
    production: {
        type: DB_DIALECT,
        database: DB_DATABASE,
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        logging: !__prod__,
        synchronize: true,
        entities: [] as any[]
    }
};


export { databaseCredentials }