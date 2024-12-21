import {Message} from "@/bus/Message";

export interface IMessageHandler<M extends Message, R = unknown> {
    handle(message: M): Promise<R>;
}