import { Author } from '../author/author'
import { MinLength, MaxLength, IsOptional, IsString, IsDefined } from 'class-validator'

export interface BookProps {
    title: string
    description?: string
    author?: Author
    other: string
}

export class Book implements BookProps {

    //-------------FIELD-------------
    @MinLength(5, {
        message: 'Title is too short',
    })
    @MaxLength(50, {
        message: 'Title is too long',
    })
    @IsString()
    @IsDefined({ message: 'Title is required' })
    public title: string

    //-------------FIELD-------------

    @IsOptional()
    @MinLength(5, {
        message: 'Description is too short',
    })
    public description?: string

    //-------------FIELD-------------

    public author?: Author
    public other: string

    constructor(props: BookProps) {
        console.log('Book props', props);

        const { title, author, description, other } = props;

        this.title = title;
        this.description = description;
        this.author = author;
        this.other = other;
    }

    public static someMethods() {
        return 'lol'
    }

    public static create(props: BookProps): Book {
        const { title, description } = props

        const book = new Book({ title, description, other:"lol" })

        return book
    }
}