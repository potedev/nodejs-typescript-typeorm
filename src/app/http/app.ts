import express from 'express'
// import bodyParser from 'body-parser'
import { __prod__, PORT, API_BASE_URL } from '../../constant'

import { v1Router } from './router'

//Middlewares
import morgan from 'morgan';
import { logStream } from '../../middlewares/logger/winston'

//Documentation
import swaggerOptions from '../../middlewares/documentation/swagger.json'
import swaggerUi from 'swagger-ui-express'


const app = express();

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors(origin))
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
