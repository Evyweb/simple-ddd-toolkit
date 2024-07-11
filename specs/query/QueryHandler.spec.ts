import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeViewCurrentNameQueryHandler} from "./FakeViewCurrentNameQueryHandler";

describe('IQueryHandler', () => {
    it('should correctly execute the query', async () => {
        // Arrange
        const query = new FakeViewCurrentNameQuery('Fake Name');
        const queryHandler = new FakeViewCurrentNameQueryHandler();

        // Act
        const response = await queryHandler.handle(query);

        // Assert
        expect(response.upperCaseName).toEqual('FAKE NAME');
    });
});
