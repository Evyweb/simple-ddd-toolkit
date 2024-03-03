export class QueryLoggingMiddleware {
    constructor(logger, middlewareId) {
        this.logger = logger;
        this.middlewareId = middlewareId;
    }
    execute(query, next) {
        const date = new Date().toISOString();
        this.logger.log(`[${date}][${this.middlewareId}][${query.type}] - ${JSON.stringify(query)}`);
        return next(query);
    }
}
//# sourceMappingURL=QueryLoggingMiddleware.js.map