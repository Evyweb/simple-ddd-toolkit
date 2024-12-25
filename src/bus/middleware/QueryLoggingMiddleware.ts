import {Logger} from "@/logger/Logger";
import {IResponse} from "@/bus/query/IResponse";
import {Query} from "@/bus/query/Query";
import {IMiddleware} from "@/bus/IMiddleware";

export class QueryLoggingMiddleware implements IMiddleware<Query, IResponse> {
    readonly __TAG = "QueryLoggingMiddleware";

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
