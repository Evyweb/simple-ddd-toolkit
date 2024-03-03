import { DomainError } from "../../src/errors/DomainError";
export class AnyDomainError extends DomainError {
    constructor() {
        super('Any domain related error message');
        this.errorName = 'AnyDomainError';
    }
}
//# sourceMappingURL=AnyDomainError.js.map