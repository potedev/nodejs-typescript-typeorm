import { Author } from '../author/author'

interface BookProps {
    title: string
    author?: Author | undefined
}

export class Book implements BookProps {
    public title: string
    public author: Author

    constructor(props: BookProps) {
        console.log('Book props', props);

        const { title, author } = props;

        this.title = title;

        if (author) {
            this.author = author;
        }
    }

    public static create(props: BookProps): Book {
        const { title } = props

        console.log('Creation book with title : ', title);

        const book = new Book({ title })

        return book
    }
}