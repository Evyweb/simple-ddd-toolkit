import {FakeCommand} from "./FakeCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {FakeCommandHandler} from "./FakeCommandHandler";
import {FakeCommandHandlerWithReturnedValue} from "./FakeCommandHandlerWithReturnedValue";

describe('CommandHandler', () => {

    it('should correctly execute the command', async () => {
        // Arrange
        const logger = new FakeLogger();
        const commandHandler = new FakeCommandHandler(logger);

        // Act
        await commandHandler.handle(new FakeCommand('fakeName'));

        // Assert
        expect(logger.messages).toHaveLength(1);
        const [message] = logger.messages;
        expect(message).toEqual('fakeName');
    });

    describe('When the command handler returns no value', () => {
        it('should not return any value', async () => {
            // Arrange
            const commandHandler = new FakeCommandHandler(new FakeLogger());

            // Act
            const result = await commandHandler.handle(new FakeCommand('fakeName'));

            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('When the command handler returns a value', () => {
        it('should correctly return the value', async () => {
            // Arrange
            const commandHandler = new FakeCommandHandlerWithReturnedValue(new FakeLogger());

            // Act
            const result = await commandHandler.handle(new FakeCommand('fakeName'));

            // Assert
            expect(result).toBe(true);
        });
    });
});
