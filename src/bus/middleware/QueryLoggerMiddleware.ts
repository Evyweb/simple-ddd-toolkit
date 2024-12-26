import {Logger} from "@/logger/Logger";
import {Query} from "@/bus/query/Query";
import {Middleware} from "@/bus/middleware/Middleware";

export class QueryLoggerMiddleware implements Middleware<Query> {
    constructor(
        private readonly logger: Logger,
        private readonly middlewareId: string
    ) {
    }

    execute<T>(query: Query, next: (query: Query) => Promise<T>): Promise<T> {
        const date = new Date().toISOString();
        this.logger.log(`[${date}][${this.middlewareId}][${query.__TAG}] - ${JSON.stringify(query)}`);
        return next(query);
    }
}