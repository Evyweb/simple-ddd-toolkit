import {DomainError} from "@/errors/DomainError";

export class AnyDomainError extends DomainError {
    readonly __TAG: string = 'AnyDomainError';

    constructor() {
        super('Any domain related error message');
    }
}
