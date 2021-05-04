import express from 'express'
import { __prod__, PORT, API_BASE_URL, COOKIE_NAME } from '../../constant'
import { v1Router } from './router'

//Middlewares
import morgan from 'morgan';
import { logStream } from '../../middlewares/logger/winston'

//Documentation
import swaggerOptions from '../../middlewares/documentation/swagger.json'
import swaggerUi from 'swagger-ui-express'

//Auth
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'

export const createServer = async () => {

    console.log('CREATING SERVER');
    const app: express.Application = express();

    app.use(express.json())
    // app.use(cors(origin))
    // app.use(compression())
    // app.use(helmet())

    //Middlewares
    app.use(morgan('combined', { stream: logStream }));

    //Documentation
    app.use(`${API_BASE_URL}/documentation/`, swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    //----------- Redis (session)- --------------
    //-------------------------------------------

    const RedisStore = connectRedis(session)
    const redis = new Redis()

    app.use(function (req, res, next) {
        req.redis = redis;
        next();
    })

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__ // cookie only works in https
            },
            saveUninitialized: false, //Not storing any empty session
            secret: 'rrandqsdqsdqskldqjkldaklqs',
            resave: false,
        })
    )

    app.use(`${API_BASE_URL}/`, v1Router)

    app.listen(PORT, () => {
        console.log(`[App]: Listening on PORT ${PORT}`)
    })

    return app
}