import {Message} from "@/bus/Message";
import {IMiddleware} from "@/bus/middleware/IMiddleware";
import {IMessageHandler} from "@/bus/IMessageHandler";

export class Bus<M extends Message> {
    private handlers: Map<string, () => IMessageHandler<M, unknown>> = new Map();
    private middlewares: IMiddleware<M, unknown>[] = [];

    register<R>(key: string, handler: () => IMessageHandler<M, R>): void {
        this.handlers.set(key, handler as () => IMessageHandler<M, unknown>);
    }

    use<R>(middleware: IMiddleware<M, R>): void {
        this.middlewares.push(middleware as IMiddleware<M, unknown>);
    }

    async execute<R>(message: M): Promise<R> {
        const handlerName = `${message.__TAG}Handler`;
        const handlerFactory = this.handlers.get(handlerName);

        if (!handlerFactory) {
            throw new Error(`No handler registered for ${handlerName}`);
        }

        const handler = handlerFactory();

        const executeHandler = (finalMessage: M): Promise<R> => {
            return handler.handle(finalMessage) as Promise<R>;
        };

        const middlewareChain = this.middlewares.reduceRight<
            (message: M) => Promise<R>
        >(
            (next, middleware) => (msg) => middleware.execute(msg, next) as Promise<R>,
            executeHandler
        );

        return middlewareChain(message);
    }
}
