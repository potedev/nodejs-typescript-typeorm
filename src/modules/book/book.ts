import { Author } from '../author/author'
import { MinLength, MaxLength, IsOptional } from 'class-validator'

interface BookProps {
    title: string
    description?: string
    author?: Author
}

export class Book implements BookProps {

    //-------------FIELD-------------

    @MinLength(5, {
        message: 'Title is too short',
    })
    @MaxLength(50, {
        message: 'Title is too long',
    })
    public title: string

    //-------------FIELD-------------

    @IsOptional()
    @MinLength(5, {
        message: 'Description is too short',
    })
    public description?: string

    //-------------FIELD-------------

    public author?: Author

    constructor(props: BookProps) {
        console.log('Book props', props);

        const { title, author, description } = props;

        this.title = title;
        this.description = description;
        this.author = author;
    }

    public static create(props: BookProps): Book {
        const { title, description } = props

        console.log('Creation book with title : ', title);

        const book = new Book({ title, description })

        return book
    }
}