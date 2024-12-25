export abstract class CustomError extends Error {
    public abstract readonly __TAG: string;

    protected constructor(message?: string) {
        super(message);
    }

    abstract isDomainError(): boolean;

    abstract isTechnicalError(): boolean;
}
