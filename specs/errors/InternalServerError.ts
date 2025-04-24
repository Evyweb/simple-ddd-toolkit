import { TechnicalError } from '@/errors/TechnicalError';

export class InternalServerError extends TechnicalError {
    readonly __TAG: string = 'InternalServerError';

    constructor() {
        super('Something went wrong');
    }
}
