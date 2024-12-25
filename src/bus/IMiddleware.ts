import {Message} from "@/bus/Message";

export interface IMiddleware<M extends Message, R> {
    readonly __TAG: string;

    execute: (message: M, next: (message: M) => Promise<R>) => Promise<R>;
}
