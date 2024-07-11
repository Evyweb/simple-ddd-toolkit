import {IQueryHandler} from "@/query/IQueryHandler";
import {IResponse} from "@/query/IResponse";
import {QueryMiddleware} from "@/middleware/QueryMiddleware";
import {Query} from "@/query/Query";

export class QueryBus {
    private handlers: Map<string, IQueryHandler<Query, any>> = new Map();

    register<Response extends IResponse>(
        queryType: string,
        handler: IQueryHandler<Query, Response>
    ): void {
        this.handlers.set(queryType, handler as IQueryHandler<Query, Response>);
    }

    private middlewares: QueryMiddleware[] = [];

    use(middleware: QueryMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute<Response extends IResponse>(query: Query): Promise<Response> {
        const handler = this.handlers.get(query.__TAG);

        if (!handler) {
            throw new Error(`No handler registered for query type ${query.__TAG}`);
        }

        const executeHandler = (finalQuery: Query) => handler.handle(finalQuery) as Promise<IResponse>;

        const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, query, next);

        const middlewareChain: (query: Query) => Promise<IResponse> = this.middlewares.reduceRight(
            executeMiddlewares,
            executeHandler
        );

        return (await middlewareChain(query)) as Response;
    }
}
