import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeResponse} from "./FakeResponse";
import {IQueryHandler} from "@/query/IQueryHandler";

export class FakeViewCurrentNameQueryHandler implements IQueryHandler<FakeViewCurrentNameQuery, FakeResponse> {
  public readonly __TAG = 'FakeViewCurrentNameQueryHandler';
  handle(query: FakeViewCurrentNameQuery): Promise<FakeResponse> {
    return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
  }
}
