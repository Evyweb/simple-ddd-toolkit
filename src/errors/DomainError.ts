import {CustomError} from './CustomError';

export abstract class DomainError extends CustomError {
    isDomainError(): boolean {
        return true;
    }

    isTechnicalError(): boolean {
        return false;
    }
}
