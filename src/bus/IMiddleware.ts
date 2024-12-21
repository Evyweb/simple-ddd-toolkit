import {Message} from "@/bus/Message";

export interface IMiddleware<M extends Message, R> {
    execute: (message: M, next: (message: M) => Promise<R>) => Promise<R>;
}
