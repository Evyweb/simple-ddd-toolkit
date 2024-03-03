import {Result} from "../../src";
import {describe, it, expect} from "vitest";

describe('Result', () => {
  describe('When an "ok" Result is created', () => {
    it('should contain the value passed to the static "ok" method', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.value).toEqual('test value');
    });

    it('should not contain any error', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.error).toBeUndefined();
    });

    it('should indicate an "ok" status', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.isOk()).toEqual(true);
    });

    it('should not indicate a failure status', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.isFail()).toEqual(false);
    });
  });

  describe('When a "failure" Result is created', () => {
    it('should contain the error passed to the static "fail" method', () => {
      // Arrange
      const error = new Error('test error');

      // Act
      const result = Result.fail(error);

      // Assert
      expect(result.error).toEqual(new Error('test error'));
    });

    it('should not contain any value', () => {
      // Arrange
      const error = new Error('test error');

      // Act
      const result = Result.fail(error);

      // Assert
      expect(result.value).toBeUndefined();
    });

    it('should not indicate an "ok" status', () => {
      // Arrange
      const error = new Error('test error');

      // Act
      const result = Result.fail(error);

      // Assert
      expect(result.isOk()).toEqual(false);
    });

    it('should indicate a "failure" status', () => {
      // Arrange
      const error = new Error('test error');

      // Act
      const result = Result.fail(error);

      // Assert
      expect(result.isFail()).toEqual(true);
    });
  });
});
