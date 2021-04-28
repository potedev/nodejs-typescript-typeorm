import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'

import { __prod__, PORT, API_BASE_URL } from '../constant'
import typeORMConfig from './database'

//Modules entities
import { User } from '../modules/user/entities/User'
import { Book } from '../modules/book/entities/Book'

//Modules controllers
import { UserController } from '../modules/user/controllers/user'
import { BookController } from '../modules/book/controllers/book'

export class Server {
    private userController: UserController;
    private bookController: BookController;
    private app: express.Application

    constructor() {
        this.app = express(); // Create our app with express
        this.configuration(); // Run specific config if needed
        this.userController = new UserController()
        this.bookController = new BookController()
        this.routes();
    }

    public configuration() {
        this.app.set('port', PORT)
        this.app.use(express.json());

        //Initializing our ORM -> typeORM here
        this.initORM();
    }

    public async initORM() {

        //We're adding all the modules we want in our application here
        typeORMConfig.entities = [User, Book]

        await createConnection(typeORMConfig);
    }

    //We 're declaring our app routes
    //You will mostly use `/api/module_name(s)/` for each module you want to use
    public routes() {

        this.app.use(`${API_BASE_URL}/users/`, this.userController.router)
        this.app.use(`${API_BASE_URL}/books/`, this.bookController.router)

        //Sample test
        this.app.get('/', (_: Request, res: Response) => {
            res.send("Hello world");
        })
    }

    //Start commands usually just make our app listen on a specific port
    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server has been started on localhost:${PORT}`)
        })
    }
}