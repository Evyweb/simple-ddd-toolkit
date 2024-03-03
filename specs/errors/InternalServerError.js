import { TechnicalError } from "../../src/errors/TechnicalError";
export class InternalServerError extends TechnicalError {
    constructor() {
        super('Something went wrong');
        this.errorName = 'InternalServerError';
    }
}
//# sourceMappingURL=InternalServerError.js.map