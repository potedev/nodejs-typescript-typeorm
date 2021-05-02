import { Book } from '../book/book'
import { MinLength, MaxLength, IsString, IsDefined } from 'class-validator'

export interface AuthorProps {
    name: string
    books: Book[]
}

export class Author implements AuthorProps {
    //-------------FIELD-------------
    @MinLength(5, {
        message: 'Name is too short',
    })
    @MaxLength(50, {
        message: 'Name is too long',
    })
    @IsString()
    @IsDefined({message:'Name is required'})
    public name: string
    public books: Book[]

    constructor(props: AuthorProps) {
        console.log('Author props', props);

        const { name, books } = props;

        this.name = name;
        this.books = books;
    }

    public static create(props: AuthorProps): Author {
        const { name, books } = props

        console.log('Creation author with name : ', name);

        const author = new Author({ name, books })

        console.log('created class author', author)

        return author
    }
}