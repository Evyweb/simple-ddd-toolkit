import {FakeViewCurrentNameQuery} from "./FakeViewCurrentNameQuery";
import {FakeResponse} from "./FakeResponse";
import {QueryHandler} from "@/bus/query/QueryHandler";

export class FakeViewCurrentNameQueryHandler extends QueryHandler<FakeViewCurrentNameQuery, FakeResponse> {
    public readonly __TAG = "FakeViewCurrentNameQueryHandler";

    handle(query: FakeViewCurrentNameQuery): Promise<FakeResponse> {
        return Promise.resolve({upperCaseName: query.name.toUpperCase()});
    }
}
