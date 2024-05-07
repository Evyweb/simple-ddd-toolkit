import {InternalServerError} from "./InternalServerError";

describe('[TechnicalError]', () => {
  it('should not be identified as a domain error', () => {
    // Act
    const error = new InternalServerError();

    // Assert
    expect(error.isDomainError()).toBe(false);
  });

  it('should be identified as a technical error', () => {
    // Act
    const error = new InternalServerError();

    // Assert
    expect(error.isTechnicalError()).toBe(true);
  });

  it('should have a name', () => {
    // Act
    const error = new InternalServerError();

    // Assert
    expect(error.errorName).toEqual('InternalServerError');
  });

  it('should have a message', () => {
    // Act
    const error = new InternalServerError();

    // Assert
    expect(error.message).toEqual('Something went wrong');
  });
});
