import { Router, Response, Request } from 'express'
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
    public index = (_: Request, res: Response): Response => {
        return res.status(200).json(this.bookService.index());
    }

    public create = async (req: Request, res: Response): Promise<Object> => {
        const book = await this.bookService.create(req.body.title)
        console.log('value returned : ', book)
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
