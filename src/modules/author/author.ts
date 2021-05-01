import { Book } from '../book/book'

interface IAuthor {
    name: String
    books: Book[]
}

export class Author implements IAuthor {
    public name: string
    public books: Book[]

    constructor(props: IAuthor) {
        console.log('Author props', props);
    }
}