import { Router, Response, Request } from 'express'
import { BaseController } from '../../common/baseController';
import { BookClass } from './book';
import { BookService } from './bookService';
// import {BaseController} from '../../../common/baseController'

export class BookController extends BaseController {
    public router: Router;
    private bookService: BookService;

    constructor(bookService: BookService) {
        super()
        //Initializing our app router using Express router
        this.router = Router();
        this.bookService = bookService
        // this.routes()
    }

    //Simple method using our app service
    public index = async (_: Request, res: Response): Promise<Response<BookClass[] | undefined>> => {
        const books = await this.bookService.index()
        return res.status(200).json(books);
    }

    public create = async (req: Request, res: Response): Object => {
        const result = await this.bookService.create(req.body.title)
        console.log(result);
        // return res.status(200).json(book);

        if (!result.success) {
            return this.clientError(res, result)
        }

        return this.ok(res, result)
    }

    public update = (req: Request, res: Response): Response => {
        return res.status(200).json(this.bookService.update(req.params.id));
    }

    public delete = (req: Request, res: Response): Response => {
        return res.status(200).json(this.bookService.delete(req.params.id));
    }
}
