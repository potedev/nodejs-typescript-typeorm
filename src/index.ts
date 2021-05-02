import express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm'
import { typeORMConfig } from './app/database/typeorm'

import { createServer } from './app/http/app'

import { __prod__ } from './constant'

const mode = __prod__ === true ? "prod" : "dev"

createConnection(typeORMConfig).then(async () => {
    console.log(`[DB]: Connecting to the database in ${mode} mode.`)

    const app:Express.Application = await createServer();
})