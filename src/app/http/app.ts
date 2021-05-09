import express from 'express'
import { __prod__, PORT, API_BASE_URL, COOKIE_NAME } from '../../constant'
import { v1Router } from './router'

import cors from 'cors'
import cookieParser from 'cookie-parser'

//Middlewares
import morgan from 'morgan';
import { logStream } from '../../middlewares/logger/winston'

//Documentation
import swaggerOptions from '../../middlewares/documentation/swagger.json'
import swaggerUi from 'swagger-ui-express'

export const createServer = async () => {

    console.log('CREATING SERVER');
    const app: express.Application = express();

    app.use(cors({
        credentials: true,
        origin: 'http://localhost:1234'
    }))

    app.use(cookieParser())
    app.use(express.json())
    // app.use(compression())
    // app.use(helmet())

    //Middlewares
    app.use(morgan('combined', { stream: logStream }));

    //Documentation
    app.use(`${API_BASE_URL}/documentation/`, swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.use(`${API_BASE_URL}/`, v1Router)

    app.listen(PORT, () => {
        console.log(`[App]: Listening on PORT ${PORT}`)
    })

    return app
}