export class Result<ValueType, ErrorType extends Error> {
    private readonly _value: ValueType | undefined;

    private readonly _error: NonNullable<ErrorType> | undefined;

    private constructor(value?: ValueType, error?: NonNullable<ErrorType>) {
        this._value = value;
        this._error = error;
    }

    public get value(): ValueType | undefined {
        return this._value;
    }

    public get error(): NonNullable<ErrorType> | undefined {
        return this._error;
    }

    public static ok<ValueType, ErrorType extends Error>(value: ValueType): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>(value);
    }

    public static fail<ValueType, ErrorType extends Error>(error: NonNullable<ErrorType>): Result<ValueType, ErrorType> {
        return new Result<ValueType, ErrorType>(undefined, error);
    }

    public isOk(): this is Result<ValueType, Error> {
        return this._error === undefined;
    }

    public isFail(): this is Result<ValueType, NonNullable<ErrorType>> {
        return this._error !== undefined;
    }
}
