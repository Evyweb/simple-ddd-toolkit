import {CustomError} from './CustomError';

export abstract class TechnicalError extends CustomError {
    isDomainError(): boolean {
        return false;
    }

    isTechnicalError(): boolean {
        return true;
    }
}
