var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CommandLoggingMiddleware {
    constructor(logger, middlewareId) {
        this.logger = logger;
        this.middlewareId = middlewareId;
    }
    execute(command, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date().toISOString();
            this.logger.log(`[${date}][${this.middlewareId}][${command.type}] - ${JSON.stringify(command)}`);
            yield next(command);
        });
    }
}
//# sourceMappingURL=CommandLoggingMiddleware.js.map