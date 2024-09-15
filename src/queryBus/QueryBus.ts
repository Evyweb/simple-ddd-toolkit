import {IQueryHandler} from "@/query/IQueryHandler";
import {IResponse} from "@/query/IResponse";
import {QueryMiddleware} from "@/middleware/QueryMiddleware";
import {Query} from "@/query/Query";
import {QueryBusPort} from "@/queryBus/QueryBusPort";

export class QueryBus implements QueryBusPort {
    private handlers: Map<string, () => IQueryHandler<Query, any>> = new Map();

    register<Response extends IResponse>(key: string, handler: () => IQueryHandler<Query, Response>): void {
        this.handlers.set(key, handler as () => IQueryHandler<Query, Response>);
    }

    private middlewares: QueryMiddleware[] = [];

    use(middleware: QueryMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute<Response extends IResponse>(query: Query): Promise<Response> {
        const handlerName = `${query.__TAG}Handler`;
        const handlerFactory = this.handlers.get(handlerName);

        if (!handlerFactory) {
            throw new Error(`No handler registered for query type ${handlerName}`);
        }

        const handler = handlerFactory();
        const executeHandler = (finalQuery: Query) => handler.handle(finalQuery) as Promise<IResponse>;

        const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, query, next);

        const middlewareChain: (query: Query) => Promise<IResponse> = this.middlewares.reduceRight(
            executeMiddlewares,
            executeHandler
        );

        return (await middlewareChain(query)) as Response;
    }
}
