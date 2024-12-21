import {TechnicalError} from "@/errors/TechnicalError";

export class InternalServerError extends TechnicalError {
    constructor() {
        super('Something went wrong');
    }
}
