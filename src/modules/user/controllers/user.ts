import { Router, Response, Request } from 'express'
import { UserService } from '../services/user';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor() {
        //Initializing our app router using Express router
        this.router = Router();
        this.userService = new UserService()
        this.routes()
    }

    //Simple method using our app service
    public getHello = (_: Request, res: Response): Response => {
        return res.status(200).json(this.userService.getHello());
    }

    //Defining our app routes
    public routes() {
        this.router.get('/', this.getHello)
    }
}
