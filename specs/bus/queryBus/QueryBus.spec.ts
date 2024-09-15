import {FakeViewCurrentNameQuery} from "../query/FakeViewCurrentNameQuery";
import {FakeViewCurrentNameQueryHandler} from "../query/FakeViewCurrentNameQueryHandler";
import {FakeResponse} from "../query/FakeResponse";
import {FakeLogger} from "../../logger/FakeLogger";
import {QueryLoggingMiddleware} from "@/bus/middleware/QueryLoggingMiddleware";
import {Bus} from "@/bus/Bus";
import {Query} from "@/bus/query/Query";

describe('[QueryBus]', () => {
    beforeEach(() => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-01'));
    });

    describe('When a handler is registered for a query type', () => {
        it('should execute the corresponding query handler', async () => {
            // Arrange
            const queryBus = new Bus<Query>();
            const query = new FakeViewCurrentNameQuery('Current name');

            queryBus.register('FakeViewCurrentNameQueryHandler', () => new FakeViewCurrentNameQueryHandler());

            // Act
            const response = await queryBus.execute<FakeResponse>(query);

            // Assert
            expect(response.upperCaseName).toEqual('CURRENT NAME');
        });
    });

    describe('When a handler is not registered for a query type', () => {
        it('should throw an error', async () => {
            // Arrange
            const queryBus = new Bus<Query>();
            const query = new FakeViewCurrentNameQuery('Current name');

            // Act & Assert
            await expect(queryBus.execute(query)).rejects.toThrow('No handler registered for FakeViewCurrentNameQuery');
        });
    });

    describe('When the query bus has middlewares', () => {
        it('should pass through the middlewares when executing the query', async () => {
            // Arrange
            const queryBus = new Bus<Query>();
            const logger = new FakeLogger();
            const query = new FakeViewCurrentNameQuery('Current name');

            queryBus.register('FakeViewCurrentNameQueryHandler', () => new FakeViewCurrentNameQueryHandler());

            queryBus.use(new QueryLoggingMiddleware(logger, 'Middleware 1'));
            queryBus.use(new QueryLoggingMiddleware(logger, 'Middleware 2'));

            // Act
            const response = await queryBus.execute<FakeResponse>(query);

            // Assert
            expect(logger.messages).toHaveLength(2);
            expect(logger.messages[0]).toEqual(
                '[2024-02-01T00:00:00.000Z][Middleware 1][FakeViewCurrentNameQuery] - {"__TAG":"FakeViewCurrentNameQuery","name":"Current name"}'
            );
            expect(logger.messages[1]).toEqual(
                '[2024-02-01T00:00:00.000Z][Middleware 2][FakeViewCurrentNameQuery] - {"__TAG":"FakeViewCurrentNameQuery","name":"Current name"}'
            );
            expect(response.upperCaseName).toEqual('CURRENT NAME');
        });
    });
});
