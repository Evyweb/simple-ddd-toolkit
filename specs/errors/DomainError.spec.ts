import {AnyDomainError} from "./AnyDomainError";
import {describe, it, expect} from "vitest";

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

  it('should have a name', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.errorName).toEqual('AnyDomainError');
  });

  it('should have a message', () => {
    // Act
    const error = new AnyDomainError();

    // Assert
    expect(error.message).toEqual('Any domain related error message');
  });
});
