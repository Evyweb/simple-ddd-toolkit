import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {FakeCommandHandler} from "./FakeCommandHandler";
import {CommandBus} from "@/commandBus/CommandBus";
import {CommandLoggingMiddleware} from "@/middleware/CommandLoggingMiddleware";
import {FakeCommandHandlerWithReturnedValue} from "./FakeCommandHandlerWithReturnedValue";

describe('[CommandBus]', () => {
    beforeEach(() => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-01'));
    });

    describe('When the command has been registered', () => {
        it('should call the corresponding command handler', async () => {
            // Arrange
            const logger = new FakeLogger();
            const commandBus = new CommandBus();
            commandBus.register('FakeUpdateNameCommand', new FakeCommandHandler(logger));

            // Act
            await commandBus.execute(new FakeUpdateNameCommand('NEW NAME'));

            // Assert
            expect(logger.messages).toHaveLength(1);
            expect(logger.messages[0]).toBe('NEW NAME');
        });

        describe('When the command does not return a value', () => {
            it('should not return any value', async () => {
                // Arrange
                const logger = new FakeLogger();
                const commandBus = new CommandBus();
                commandBus.register('FakeUpdateNameCommand', new FakeCommandHandler(logger));

                // Act
                const result = await commandBus.execute(new FakeUpdateNameCommand('NEW NAME'));

                // Assert
                expect(result).toBeUndefined();
            });
        });
        describe('When the command returns a value', () => {
            it('should return the correct value', async () => {
                // Arrange
                const logger = new FakeLogger();
                const commandBus = new CommandBus();
                commandBus.register('FakeUpdateNameCommand', new FakeCommandHandlerWithReturnedValue(logger));

                // Act
                const result = await commandBus.execute(new FakeUpdateNameCommand('NEW NAME'));

                // Assert
                expect(result).toEqual('NEW NAME');
            });
        });
    });

    describe('When the command has not been registered', () => {
        it('should throw an error', () => {
            // Arrange
            const command = new FakeUpdateNameCommand('NEW NAME');
            const commandBus = new CommandBus();

            const errorMessage = `No handler registered for command type ${command.__TAG}`;

            // Act & Assert
            expect(() => commandBus.execute(command)).rejects.toThrow(errorMessage);
        });
    });

    describe('When the command bus has middlewares', () => {
        it('should pass through the middlewares when executing the command', async () => {
            // Arrange
            const command = new FakeUpdateNameCommand('NEW NAME');
            const logger = new FakeLogger();
            const commandBus = new CommandBus();
            commandBus.register('FakeUpdateNameCommand', new FakeCommandHandler(logger));

            commandBus.use(new CommandLoggingMiddleware(logger, 'Middleware 1'));
            commandBus.use(new CommandLoggingMiddleware(logger, 'Middleware 2'));

            // Act
            await commandBus.execute(command);

            // Assert
            expect(logger.messages).toHaveLength(3);
            expect(logger.messages[0]).toEqual(
                '[2024-02-01T00:00:00.000Z][Middleware 1][FakeUpdateNameCommand] - {"__TAG":"FakeUpdateNameCommand","name":"NEW NAME"}'
            );
            expect(logger.messages[1]).toEqual(
                '[2024-02-01T00:00:00.000Z][Middleware 2][FakeUpdateNameCommand] - {"__TAG":"FakeUpdateNameCommand","name":"NEW NAME"}'
            );
            expect(logger.messages[2]).toEqual('NEW NAME');
        });
    });
});
