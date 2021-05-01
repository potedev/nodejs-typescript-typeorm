import { IBookRepo } from '../../bookRepo'
import { Book } from '../../book'

//Equivalent to a specific service in a CRUD API
export class CreateBook {
    private bookRepo: IBookRepo

    constructor(bookRepo: IBookRepo) {
        this.bookRepo = bookRepo
    }

    //This is what our use case will do
    public async execute(request: any) {
        //Retrieve the author id
        //Request is like a body here
        //request.body.title

        try {
            //On créé l'instance de notre class BOOK
            //Pour ensuite l'ajouter dans notre BDD avec notre ORM

            console.log('book create use case props', request);

            const book = Book.create(request)

            console.log('book class object', book);

            //Handle bad class instanciation

            //Storing to our database with our ORM
            await this.bookRepo.save(book)

            //Todo parse Result
            return { success: true }

        } catch (e) {
            //Handle useCase errors
        }
    }
}