import {FakePresenter} from "./FakePresenter";
import {FakeUseCase} from "./FakeUseCase";
import {FakeCommand} from "../command/FakeCommand";
import {describe, it, expect} from "vitest";

describe('When a use case is executed', () => {
  it('should correctly execute the use case', async () => {
    // Arrange
    const presenter = new FakePresenter();
    const useCase = new FakeUseCase(presenter);
    const command: FakeCommand = { type: 'FAKE_COMMAND_NAME', name: 'fakeName' };

    // Act
    await useCase.execute(command);

    // Assert
    expect(presenter.viewModel.newName).toEqual('FAKENAME');
  });
});
