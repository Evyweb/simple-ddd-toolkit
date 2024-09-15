import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeResponse} from "./FakeResponse";
import {QueryHandler} from "@/query/QueryHandler";

export class FakeViewCurrentNameQueryHandler extends QueryHandler<FakeViewCurrentNameQuery, FakeResponse> {
  handle(query: FakeViewCurrentNameQuery): Promise<FakeResponse> {
    return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
  }
}
