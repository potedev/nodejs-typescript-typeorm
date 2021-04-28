import { Book } from '../entities/Book'

export class BookService {
    constructor() { }

    public index = (): Array<object> => {
        return [{
            name: 'les misérables'
        },
        {
            name: 'la horde du contrevent'
        }]
    }

    public create = async (title: string): Promise<Book> => {
        return Book.create({ title: title }).save()
    }

    public update = (id: string): string => {
        return `Book ${id} updated`
    }

    public delete = (id: string): string => {
        return `Book ${id} deleted`
    }
}
