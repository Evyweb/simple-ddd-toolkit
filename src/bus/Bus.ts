import type { IMessageHandler } from '@/bus/IMessageHandler';
import type { Message } from '@/bus/Message';
import type { Middleware } from '@/bus/middleware/Middleware';

export class Bus<M extends Message> {
    private handlers: Map<string, () => IMessageHandler<M>> = new Map();
    private middlewares: Middleware<M>[] = [];

    register<R>(handlerFactory: () => IMessageHandler<M, R>): void {
        const handler = handlerFactory();
        if (!handler.__TAG) {
            throw new Error(
                'The handler must have a __TAG property to be registered.'
            );
        }
        this.handlers.set(
            handler.__TAG,
            handlerFactory as () => IMessageHandler<M>
        );
    }

    use(middleware: Middleware<M>): void {
        this.middlewares.push(middleware as Middleware<M>);
    }

    async execute<R>(message: M): Promise<R> {
        const handlerName = `${message.__TAG}Handler`;
        const handlerFactory = this.handlers.get(handlerName);

        if (!handlerFactory) {
            throw new Error(
                `No handler registered for ${message.__TAG}. Please check the __TAG property of both command and handler.`
            );
        }

        const handler = handlerFactory();

        const executeHandler = (finalMessage: M): Promise<R> => {
            return handler.handle(finalMessage) as Promise<R>;
        };

        const middlewareChain = this.middlewares.reduceRight<
            (message: M) => Promise<R>
        >(
            (next, middleware) => (msg) => middleware.execute(msg, next),
            executeHandler
        );

        return middlewareChain(message);
    }
}
