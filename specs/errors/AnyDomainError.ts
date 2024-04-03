import {DomainError} from "../../src";

export class AnyDomainError extends DomainError {
  errorName = 'AnyDomainError';

  constructor() {
    super('Any domain related error message');
  }
}
