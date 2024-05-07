import {Result} from "@/result/Result";

describe('Result', () => {
  describe('When an "ok" Result is created', () => {
    it('should contain the value passed to the static "ok" method', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(result.getValue()).toEqual('test value');
    });

    it('should throw an error instead of accessing the error', () => {
      // Arrange
      const value = 'test value';

      // Act
      const result = Result.ok(value);

      // Assert
      expect(() => result.getError()).toThrow();
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
      expect(result.getError()).toEqual(new Error('test error'));
    });

    it('should throw an error instead of accessing the value', () => {
      // Arrange
      const error = new Error('test error');

      // Act
      const result = Result.fail(error);

      // Assert
      expect(() => result.getValue()).toThrow();
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
