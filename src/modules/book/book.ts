import { validate } from 'class-validator'

export interface BookProps {
    title: string
    updatedAt: string | Date | null
    createdAt: string | Date | null
}

export class BookClass implements BookProps {
    public title: string
    public updatedAt: string | Date | null
    public createdAt: string | Date | null

    constructor(props: BookProps) {
        this.title = props.title
        this.updatedAt = props.updatedAt
        this.createdAt = props.createdAt
    }

    public static async create(props: BookProps) {

        const book = new BookClass(props)

        const errors = await validate(book);

        console.log(errors);

        if (errors.length > 0) {
            console.log('errors', errors);
            throw new Error(`Validation failed!`);
        }

        console.log('book class created');
        return book
    }
}