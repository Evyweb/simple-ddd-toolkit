var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class QueryBus {
    constructor() {
        this.handlers = new Map();
        this.middlewares = [];
    }
    register(queryType, handler) {
        this.handlers.set(queryType, handler);
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(query.type);
            const NO_HANDLER_ERROR_MESSAGE = `No handler registered for query type ${query.type}`;
            if (!handler) {
                throw new Error(NO_HANDLER_ERROR_MESSAGE);
            }
            const executeHandler = (finalQuery) => handler.handle(finalQuery);
            const executeMiddlewares = (next, middleware) => middleware.execute.bind(middleware, query, next);
            const middlewareChain = this.middlewares.reduceRight(executeMiddlewares, executeHandler);
            return (yield middlewareChain(query));
        });
    }
}
//# sourceMappingURL=QueryBus.js.map