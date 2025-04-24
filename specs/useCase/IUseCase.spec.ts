import { FakeCommand } from '../bus/command/FakeCommand';
import { FakePresenter } from './FakePresenter';
import { FakeUseCase } from './FakeUseCase';

describe('When a use case is executed', () => {
    it('should correctly execute the use case', async () => {
        // Arrange
        const presenter = new FakePresenter();
        const useCase = new FakeUseCase(presenter);

        // Act
        await useCase.execute(new FakeCommand('Fake Name'));

        // Assert
        expect(presenter.viewModel.newName).toEqual('FAKE NAME');
    });
});
