import { Bus } from '@/bus/Bus';
import type { Command } from '@/bus/command/Command';
import { CommandLoggerMiddleware } from '@/bus/middleware/CommandLoggerMiddleware';
import { FakeLogger } from '../../logger/FakeLogger';
import { FakeInvalidCommandHandler } from './FakeInvalidCommandHandler';
import { FakeUpdateNameCommand } from './FakeUpdateNameCommand';
import { FakeUpdateNameCommandHandler } from './FakeUpdateNameCommandHandler';
import { FakeUpdateNameWithReturnedValueCommand } from './FakeUpdateNameWithReturnedValueCommand';
import { FakeUpdateNameWithReturnedValueCommandHandler } from './FakeUpdateNameWithReturnedValueCommandHandler';

describe('[CommandBus]', () => {
    beforeEach(() => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-01'));
    });

    describe('When the command has been registered', () => {
        it('should call the corresponding command handler', async () => {
            // Arrange
            const logger = new FakeLogger();
            const commandBus = new Bus<Command>();
            commandBus.register(() => new FakeUpdateNameCommandHandler(logger));

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
                const commandBus = new Bus<Command>();
                commandBus.register(
                    () => new FakeUpdateNameCommandHandler(logger)
                );

                // Act
                const result = await commandBus.execute(
                    new FakeUpdateNameCommand('NEW NAME')
                );

                // Assert
                expect(result).toBeUndefined();
            });
        });

        describe('When the command returns a value', () => {
            it('should return the correct value', async () => {
                // Arrange
                const logger = new FakeLogger();
                const commandBus = new Bus<Command>();
                commandBus.use(
                    new CommandLoggerMiddleware(logger, 'Middleware')
                );
                commandBus.register(
                    () =>
                        new FakeUpdateNameWithReturnedValueCommandHandler(
                            logger
                        )
                );

                // Act
                const result = await commandBus.execute<string>(
                    new FakeUpdateNameWithReturnedValueCommand('NEW NAME')
                );

                // Assert
                expect(result).toEqual<string>('NEW NAME');
            });
        });

        describe('When the handler does not have a __TAG property', () => {
            it('should throw an error', () => {
                // Arrange
                const commandBus = new Bus<Command>();

                // Act
                const registration = () =>
                    commandBus.register(() => new FakeInvalidCommandHandler());

                // Assert
                expect(registration).toThrowError(
                    'The handler must have a __TAG property to be registered.'
                );
            });
        });
    });

    describe('When the command has not been registered', () => {
        it('should throw an error', async () => {
            // Arrange
            const command = new FakeUpdateNameCommand('NEW NAME');
            const commandBus = new Bus<Command>();

            const errorMessage = `No handler registered for ${command.__TAG}. Please check the __TAG property of both command and handler.`;

            // Act & Assert
            await expect(() => commandBus.execute(command)).rejects.toThrow(
                errorMessage
            );
        });
    });

    describe('When the command bus has middlewares', () => {
        it('should pass through the middlewares when executing the command', async () => {
            // Arrange
            const command = new FakeUpdateNameCommand('NEW NAME');
            const logger = new FakeLogger();
            const commandBus = new Bus<Command>();
            commandBus.register(() => new FakeUpdateNameCommandHandler(logger));

            commandBus.use(new CommandLoggerMiddleware(logger, 'Middleware 1'));
            commandBus.use(new CommandLoggerMiddleware(logger, 'Middleware 2'));

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
