import {IQueryHandler} from "../../src";
import {FakeQuery} from "./FakeQuery";
import {FakeResponse} from "./FakeResponse";

export class FakeQueryHandler implements IQueryHandler<FakeQuery, FakeResponse> {
  handle(query: FakeQuery): Promise<FakeResponse> {
    return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
  }
}
