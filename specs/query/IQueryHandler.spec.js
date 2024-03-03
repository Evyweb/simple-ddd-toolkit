var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FakeQueryHandler } from "./FakeQueryHandler";
import { describe, it, expect } from "vitest";
describe('IQueryHandler', () => {
    it('should correctly execute the query', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const query = { type: 'VIEW_FAKE_NAME', name: 'fakeName' };
        const queryHandler = new FakeQueryHandler();
        // Act
        const response = yield queryHandler.handle(query);
        // Assert
        expect(response.upperCaseName).toEqual('FAKENAME');
    }));
});
//# sourceMappingURL=IQueryHandler.spec.js.map