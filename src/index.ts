import 'reflect-metadata';
import { createConnection } from 'typeorm'
import { typeORMConfig } from './app/database/typeorm'

import { bookRouter } from './modules/book/bookRouter'

import express from 'express'

import { __prod__ } from './constant'

const mode = __prod__ === true ? "prod" : "dev"

createConnection(typeORMConfig).then(async () => {
    console.log(`[DB]: Connecting to the database in ${mode} mode.`)

    const app = express();

    app.use(express.json())

    app.use(`/api/v1/books`, bookRouter)

    app.listen(4000, () => {
        console.log(`[App]: Listening on PORT ${4000}`)
    })
})