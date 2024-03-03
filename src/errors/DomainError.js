import { CustomError } from './CustomError';
export class DomainError extends CustomError {
    isDomainError() {
        return true;
    }
    isTechnicalError() {
        return false;
    }
}
//# sourceMappingURL=DomainError.js.map