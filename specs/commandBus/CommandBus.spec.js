var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FakeLogger } from "../logger/FakeLogger";
import { FakeCommandHandler } from "./FakeCommandHandler";
import { CommandBus } from "../../src/commandBus/CommandBus";
import { CommandLoggingMiddleware } from "../../src/middleware/CommandLoggingMiddleware";
import { describe, it, expect, beforeEach, vi } from "vitest";
describe('[CommandBus]', () => {
    beforeEach(() => {
        vi.useFakeTimers().setSystemTime(new Date('2024-02-01'));
    });
    describe('When the command has been registered', () => {
        it('should call the corresponding command handler', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const UPDATE_NAME_COMMAND = 'UPDATE_NAME_COMMAND';
            const command = { type: UPDATE_NAME_COMMAND, name: 'NEW NAME' };
            const logger = new FakeLogger();
            const commandHandler = new FakeCommandHandler(logger);
            const commandBus = new CommandBus();
            commandBus.register(UPDATE_NAME_COMMAND, commandHandler);
            // Act
            yield commandBus.execute(command);
            // Assert
            expect(logger.messages).toHaveLength(1);
            expect(logger.messages[0]).toBe('NEW NAME');
        }));
    });
    describe('When the command has not been registered', () => {
        it('should throw an error', () => {
            // Arrange
            const UPDATE_NAME_COMMAND = 'UPDATE_NAME_COMMAND';
            const command = { type: UPDATE_NAME_COMMAND, name: 'NEW NAME' };
            const commandBus = new CommandBus();
            const errorMessage = `No handler registered for command type ${command.type}`;
            // Act & Assert
            expect(() => commandBus.execute(command)).rejects.toThrow(errorMessage);
        });
    });
    describe('When the command bus has middlewares', () => {
        it('should pass through the middlewares when executing the command', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const UPDATE_NAME_COMMAND = 'UPDATE_NAME_COMMAND';
            const command = { type: UPDATE_NAME_COMMAND, name: 'NEW NAME' };
            const logger = new FakeLogger();
            const commandHandler = new FakeCommandHandler(logger);
            const commandBus = new CommandBus();
            commandBus.register(UPDATE_NAME_COMMAND, commandHandler);
            commandBus.use(new CommandLoggingMiddleware(logger, 'Middleware 1'));
            commandBus.use(new CommandLoggingMiddleware(logger, 'Middleware 2'));
            // Act
            yield commandBus.execute(command);
            // Assert
            expect(logger.messages).toHaveLength(3);
            expect(logger.messages[0]).toEqual('[2024-02-01T00:00:00.000Z][Middleware 1][UPDATE_NAME_COMMAND] - {"type":"UPDATE_NAME_COMMAND","name":"NEW NAME"}');
            expect(logger.messages[1]).toEqual('[2024-02-01T00:00:00.000Z][Middleware 2][UPDATE_NAME_COMMAND] - {"type":"UPDATE_NAME_COMMAND","name":"NEW NAME"}');
            expect(logger.messages[2]).toEqual('NEW NAME');
        }));
    });
});
//# sourceMappingURL=CommandBus.spec.js.map