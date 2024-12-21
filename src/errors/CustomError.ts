export abstract class CustomError extends Error {
    public readonly TAG_NAME: string = this.constructor.name;

    protected constructor(message?: string) {
        super(message);
    }

    abstract isDomainError(): boolean;

    abstract isTechnicalError(): boolean;
}
