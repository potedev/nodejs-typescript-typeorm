import { Router, Response, Request } from 'express'
import { Book } from '../entities/Book';
import { BookService } from '../services/book';

export class BookController {
    public router: Router;
    private bookService: BookService;

    constructor() {
        //Initializing our app router using Express router
        this.router = Router();
        this.bookService = new BookService()
        this.routes()
    }

    //Simple method using our app service
    public index = async (_: Request, res: Response): Promise<Response<Book[] | undefined>> => {
        const books = await this.bookService.index()
        return res.status(200).json(books);
    }

    public create = async (req: Request, res: Response): Promise<Object> => {
        const book = await this.bookService.create(req.body.title)
        return res.status(200).json(book);
    }

    public update = (req: Request, res: Response): Response => {
        return res.status(200).json(this.bookService.update(req.params.id));
    }

    public delete = (req: Request, res: Response): Response => {
        return res.status(200).json(this.bookService.delete(req.params.id));
    }

    //Defining our app routes
    public routes() {
        this.router.get('/', this.index)
        this.router.post('/', this.create)
        this.router.put('/:id', this.update)
        this.router.delete('/:id', this.delete)
    }
}
