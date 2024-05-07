import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeQueryHandler} from "./FakeQueryHandler";

describe('IQueryHandler', () => {
    it('should correctly execute the query', async () => {
        // Arrange
        const query = new FakeViewCurrentNameQuery('Fake Name');
        const queryHandler = new FakeQueryHandler();

        // Act
        const response = await queryHandler.handle(query);

        // Assert
        expect(response.upperCaseName).toEqual('FAKE NAME');
    });
});
