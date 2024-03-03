var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CommandBus {
    constructor() {
        this.handlers = new Map();
        this.middlewares = [];
    }
    register(commandType, handler) {
        this.handlers.set(commandType, handler);
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(command.type);
            if (!handler) {
                throw new Error(`No handler registered for command type ${command.type}`);
            }
            const middlewareChain = this.middlewares.reduceRight((next, middleware) => (currentCommand) => middleware.execute(currentCommand, next), (finalCommand) => __awaiter(this, void 0, void 0, function* () {
                yield handler.handle(finalCommand);
            }));
            yield middlewareChain(command);
        });
    }
}
//# sourceMappingURL=CommandBus.js.map