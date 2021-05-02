import { Author } from './author'

export interface IAuthorRepo {
    exists(authorId: string): Promise<boolean>;
    save(author: Author): Promise<void>;
}

export class AuthorRepo implements IAuthorRepo {
    private entities: any

    constructor(entities: any) {
        this.entities = entities

        console.log('current book repo entities', this.entities)
    }

    async save(author: Author): Promise<void> {

        const authorEntity = this.entities.Author;

        console.log('repo author props', author);

        const exists = await this.exists(author.name);

        console.log('AUTHOR ALREADY EXIST ?', exists);

        if (!exists) {
            authorEntity.save(author)
        }

        return;
    }

    public async exists(authorName: string): Promise<boolean> {
        const authorEntity = this.entities.Author;

        const result = await authorEntity.findOne({ name: authorName })

        console.log('exists result ', result)

        return !!result === true;
    }
}