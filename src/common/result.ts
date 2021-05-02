export interface Error {
    field: string,
    message: string
}

export class Result<T> {
    public isSuccess: boolean
    public isFailure?: boolean
    public error?: Error
    private value: T | undefined

    private constructor(isSuccess: boolean, error?: Error, value?: T) {
        this.isSuccess = isSuccess
        this.isFailure = !isSuccess
        this.error = error
        this.value = value
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

    public static fail<U>(error: Error): Result<U> {
        return new Result<U>(false, error);
    }
}