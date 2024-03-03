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
import { describe, it, expect } from "vitest";
describe('ICommandHandler', () => {
    it('should correctly execute the command', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const command = { type: 'FAKE_COMMAND_NAME', name: 'fakeName' };
        const logger = new FakeLogger();
        const commandHandler = new FakeCommandHandler(logger);
        // Act
        yield commandHandler.handle(command);
        // Assert
        expect(logger.messages).toHaveLength(1);
        const [message] = logger.messages;
        expect(message).toEqual('fakeName');
    }));
});
//# sourceMappingURL=ICommandHandler.spec.js.map