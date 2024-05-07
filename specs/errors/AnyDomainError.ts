import {DomainError} from "@/errors/DomainError";

export class AnyDomainError extends DomainError {
  constructor() {
    super('Any domain related error message');
  }
}
