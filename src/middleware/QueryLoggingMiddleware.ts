import {QueryMiddleware} from "./QueryMiddleware";
import {Logger} from "@/logger/Logger";
import {IResponse} from "@/query/IResponse";
import {Query} from "@/query/Query";

export class QueryLoggingMiddleware implements QueryMiddleware {
    constructor(
        private readonly logger: Logger,
        private readonly middlewareId: string
    ) {
    }

    execute(query: Query, next: (query: Query) => Promise<IResponse>): Promise<IResponse> {
        const date = new Date().toISOString();
        this.logger.log(`[${date}][${this.middlewareId}][${query.__TAG}] - ${JSON.stringify(query)}`);
        return next(query);
    }
}
