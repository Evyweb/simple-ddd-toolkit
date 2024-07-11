import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeResponse} from "./FakeResponse";
import {IQueryHandler} from "@/query/IQueryHandler";

export class FakeViewCurrentNameQueryHandler implements IQueryHandler<FakeViewCurrentNameQuery, FakeResponse> {
  handle(query: FakeViewCurrentNameQuery): Promise<FakeResponse> {
    return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
  }
}