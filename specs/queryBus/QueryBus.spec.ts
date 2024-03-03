import {QueryBus} from "../../src";
import {FakeQuery} from "../query/FakeQuery";
import {FakeQueryHandler} from "../query/FakeQueryHandler";
import {FakeResponse} from "../query/FakeResponse";
import {FakeLogger} from "../logger/FakeLogger";
import {QueryLoggingMiddleware} from "../../src";
import {describe, it, expect, beforeEach, vi} from "vitest";

describe('[QueryBus]', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date('2024-02-01'));
  });

  describe('When a handler is registered for a query type', () => {
    it('should execute the corresponding query handler', async () => {
      // Arrange
      const queryBus = new QueryBus();
      const query: FakeQuery = { type: 'VIEW_CURRENT_NAME', name: 'Current name' };

      queryBus.register('VIEW_CURRENT_NAME', new FakeQueryHandler());

      // Act
      const response = await queryBus.execute<FakeQuery, FakeResponse>(query);

      // Assert
      expect(response.upperCaseName).toEqual('CURRENT NAME');
    });
  });

  describe('When a handler is not registered for a query type', () => {
    it('should throw an error', async () => {
      // Arrange
      const queryBus = new QueryBus();
      const query: FakeQuery = { type: 'VIEW_CURRENT_NAME', name: 'Current name' };

      // Act & Assert
      await expect(queryBus.execute(query)).rejects.toThrow('No handler registered for query type VIEW_CURRENT_NAME');
    });
  });

  describe('When the query bus has middlewares', () => {
    it('should pass through the middlewares when executing the query', async () => {
      // Arrange
      const queryBus = new QueryBus();
      const logger = new FakeLogger();
      const query: FakeQuery = { type: 'VIEW_CURRENT_NAME', name: 'Current name' };

      queryBus.register('VIEW_CURRENT_NAME', new FakeQueryHandler());

      queryBus.use(new QueryLoggingMiddleware(logger, 'Middleware 1'));
      queryBus.use(new QueryLoggingMiddleware(logger, 'Middleware 2'));

      // Act
      const response = await queryBus.execute<FakeQuery, FakeResponse>(query);

      // Assert
      expect(logger.messages).toHaveLength(2);
      expect(logger.messages[0]).toEqual(
        '[2024-02-01T00:00:00.000Z][Middleware 1][VIEW_CURRENT_NAME] - {"type":"VIEW_CURRENT_NAME","name":"Current name"}'
      );
      expect(logger.messages[1]).toEqual(
        '[2024-02-01T00:00:00.000Z][Middleware 2][VIEW_CURRENT_NAME] - {"type":"VIEW_CURRENT_NAME","name":"Current name"}'
      );
      expect(response.upperCaseName).toEqual('CURRENT NAME');
    });
  });
});
