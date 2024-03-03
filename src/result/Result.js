export class Result {
    constructor(value, error) {
        this._value = value;
        this._error = error;
    }
    get value() {
        return this._value;
    }
    get error() {
        return this._error;
    }
    static ok(value) {
        return new Result(value);
    }
    static fail(error) {
        return new Result(undefined, error);
    }
    isOk() {
        return this._error === undefined;
    }
    isFail() {
        return this._error !== undefined;
    }
}
//# sourceMappingURL=Result.js.map