import {TechnicalError} from "../../src";

export class InternalServerError extends TechnicalError {
  errorName = 'InternalServerError';

  constructor() {
    super('Something went wrong');
  }
}
