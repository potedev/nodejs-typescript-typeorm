export interface Error {
    field: string,
    message: string
}

export class Result<T> {
    public isSuccess: boolean
    public isFailure?: boolean
    public errors?: Error[]
    private value: T | undefined

    private constructor(isSuccess: boolean, errors?: Error[], value?: T) {
        this.isSuccess = isSuccess
        this.isFailure = !isSuccess
        this.errors = errors
        this.value = value

        console.log('error array : ', errors)
    }

    public getValue(): T {

        if (!this.isSuccess) {
            throw new Error(`Cant retrieve the value from a failed result.`)
        } else if (typeof this.value === 'undefined') {
            throw new Error(`Cant retrieve the value, it is undefined.`)
        }

        return this.value
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(errors: Error[]): Result<U> {
        return new Result<U>(false, errors);
    }
}