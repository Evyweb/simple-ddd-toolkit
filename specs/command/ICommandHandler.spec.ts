import {FakeCommand} from "./FakeCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {FakeCommandHandler} from "./FakeCommandHandler";
import {describe, it, expect} from "vitest";

describe('ICommandHandler', () => {
  it('should correctly execute the command', async () => {
    // Arrange
    const command: FakeCommand = { type: 'FAKE_COMMAND_NAME', name: 'fakeName' };
    const logger = new FakeLogger();
    const commandHandler = new FakeCommandHandler(logger);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(logger.messages).toHaveLength(1);
    const [message] = logger.messages;
    expect(message).toEqual('fakeName');
  });
});
