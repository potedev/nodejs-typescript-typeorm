import { IBookRepo } from '../../bookRepo'
import { Result } from '../../../../common/result'

export class GetBookById {
    private bookRepo: IBookRepo

    constructor(bookRepo: IBookRepo) {
        this.bookRepo = bookRepo
    }

    public async execute(request: any) {
        const { id } = request
        let book;

        try {

            try {
                book = await this.bookRepo.getBookById(id)
            }
            catch (e) {
                return Result.fail(e.message)
            }

            return Result.ok(book)

        } catch (e) {
            //TODO APP ERROR
            return Result.fail(e)
        }
    }
}