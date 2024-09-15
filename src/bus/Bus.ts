import {Message} from "@/bus/Message";

type Middleware<MessageType> = {
    execute: (message: MessageType, next: (message: MessageType) => Promise<any>) => Promise<any>;
};

interface MessageHandler<M extends Message, R> {
    handle(message: M): Promise<R>;
}

export class Bus<M extends Message> {
    private handlers: Map<string, () => MessageHandler<M, any>> = new Map();
    private middlewares: Middleware<M>[] = [];

    register<R>(key: string, handler: () => MessageHandler<M, R>): void {
        this.handlers.set(key, handler);
    }

    use(middleware: Middleware<M>): void {
        this.middlewares.push(middleware);
    }

    async execute<R>(message: M): Promise<R> {
        const handlerName = `${message.__TAG}Handler`;
        const handlerFactory = this.handlers.get(handlerName);

        if (!handlerFactory) {
            throw new Error(`No handler registered for ${handlerName}`);
        }

        const handler = handlerFactory();
        const executeHandler = (finalMessage: M) => handler.handle(finalMessage) as Promise<R>;

        const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, message, next);

        const middlewareChain: (message: M) => Promise<R> = this.middlewares.reduceRight(
            executeMiddlewares,
            executeHandler
        );

        return (await middlewareChain(message)) as R;
    }
}
