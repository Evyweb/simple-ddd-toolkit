import {FakeCommand} from "./FakeCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {FakeCommandHandler} from "./FakeCommandHandler";

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
});
