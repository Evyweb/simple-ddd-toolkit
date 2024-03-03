export abstract class CustomError extends Error {
  public abstract readonly errorName: string;

  protected constructor(message?: string) {
    super(message);
  }

  abstract isDomainError(): boolean;

  abstract isTechnicalError(): boolean;
}
