var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FakePresenter } from "./FakePresenter";
import { FakeUseCase } from "./FakeUseCase";
import { describe, it, expect } from "vitest";
describe('When a use case is executed', () => {
    it('should correctly execute the use case', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const presenter = new FakePresenter();
        const useCase = new FakeUseCase(presenter);
        const command = { type: 'FAKE_COMMAND_NAME', name: 'fakeName' };
        // Act
        yield useCase.execute(command);
        // Assert
        expect(presenter.viewModel.newName).toEqual('FAKENAME');
    }));
});
//# sourceMappingURL=IUseCase.spec.js.map