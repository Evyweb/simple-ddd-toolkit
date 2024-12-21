type Success<ValueType> = { _tag: 'success'; value: ValueType };
type Failure<ErrorType extends Error> = { _tag: 'failure'; error: ErrorType };

export class Result<ValueType, ErrorType extends Error> {
    private readonly result: Success<ValueType> | Failure<ErrorType>;

    private constructor(result: Success<ValueType> | Failure<ErrorType>) {
        this.result = result;
    }

    public static ok<ValueType, ErrorType extends Error>(value: ValueType): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>({_tag: 'success', value});
    }

    public static fail<ValueType, ErrorType extends Error>(error: ErrorType): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>({_tag: 'failure', error});
    }

    public isOk(): this is Success<ValueType> {
        return this.result._tag === 'success';
    }

    public isFail(): this is Failure<ErrorType> {
        return this.result._tag === 'failure';
    }

    public getValue(): ValueType {
        if (this.result._tag !== 'success') {
            throw new Error("Attempted to access 'value' of a failure result.");
        }
        return this.result.value;
    }

    public getError(): ErrorType {
        if (this.result._tag !== 'failure') {
            throw new Error("Attempted to access 'error' of a success result.");
        }
        return this.result.error;
    }
}
