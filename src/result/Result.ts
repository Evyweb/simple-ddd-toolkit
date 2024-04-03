export class Result<ValueType, ErrorType extends Error> {
    private readonly _value: ValueType | undefined;
    private readonly _error: ErrorType | undefined;

    private constructor(value?: ValueType, error?: ErrorType) {
        this._value = value;
        this._error = error;
    }

    public get value(): ValueType | undefined {
        return this._value;
    }

    public get error(): ErrorType | undefined {
        return this._error;
    }

    public static ok<ValueType, ErrorType extends Error>(value: ValueType): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>(value);
    }

    public static fail<ValueType, ErrorType extends Error>(error: ErrorType): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>(undefined, error);
    }

    public isOk(): this is Result<ValueType, never> {
        return this._error === undefined;
    }

    public isFail(): this is Result<never, ErrorType> {
        return this._error !== undefined;
    }
}
