export interface Middleware<T> {
    execute: <R>(message: T, next: (message: T) => Promise<R>) => Promise<R>;
}
