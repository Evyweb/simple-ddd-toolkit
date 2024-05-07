export abstract class CustomError extends Error {
  public readonly __TAG: string = this.constructor.name;

  protected constructor(message?: string) {
    super(message);
  }

  abstract isDomainError(): boolean;

  abstract isTechnicalError(): boolean;
}
