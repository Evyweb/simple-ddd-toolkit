import { CustomError } from './CustomError';
export class TechnicalError extends CustomError {
    isDomainError() {
        return false;
    }
    isTechnicalError() {
        return true;
    }
}
//# sourceMappingURL=TechnicalError.js.map