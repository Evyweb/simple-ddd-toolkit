import {AnyDomainError} from "./AnyDomainError";

describe('[DomainError]', () => {
  it('should not be identified as a technical error', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.isTechnicalError()).toBe(false);
  });

  it('should be identified as a domain error', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.isDomainError()).toBe(true);
  });

  it('should have a tag name', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.__TAG).toEqual('AnyDomainError');
  });

  it('should have a message', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.message).toEqual('Any domain related error message');
  });
});
