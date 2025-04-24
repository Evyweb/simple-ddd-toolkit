import type { Message } from '@/bus/Message';

export interface IMessageHandler<M extends Message, R = unknown> {
    __TAG: string;

    handle(message: M): Promise<R>;
}
