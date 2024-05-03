import {FakeQuery} from "./FakeQuery";
import {FakeQueryHandler} from "./FakeQueryHandler";
import {describe, it, expect} from "vitest";

describe('IQueryHandler', () => {
  it('should correctly execute the query', async () => {
    // Arrange
    const query: FakeQuery = { type: 'VIEW_FAKE_NAME', name: 'Fake Name' };
    const queryHandler = new FakeQueryHandler();

    // Act
    const response = await queryHandler.handle(query);

    // Assert
    expect(response.upperCaseName).toEqual('FAKE NAME');
  });
});
