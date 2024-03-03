import {TechnicalError} from "../../src/errors/TechnicalError";

export class InternalServerError extends TechnicalError {
  errorName = 'InternalServerError';

  constructor() {
    super('Something went wrong');
  }
}
