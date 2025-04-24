import type { Middleware } from '@/bus/middleware/Middleware';
import type { Query } from '@/bus/query/Query';
import type { Logger } from '@/logger/Logger';

export class QueryLoggerMiddleware implements Middleware<Query> {
    constructor(
        private readonly logger: Logger,
        private readonly middlewareId: string
    ) {}

    execute<T>(query: Query, next: (query: Query) => Promise<T>): Promise<T> {
        const date = new Date().toISOString();
        this.logger.log(`[${date}][${this.middlewareId}][${query.__TAG}] - ${JSON.stringify(query)}`);
        return next(query);
    }
}
