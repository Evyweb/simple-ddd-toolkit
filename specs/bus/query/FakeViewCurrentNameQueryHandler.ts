import { QueryHandler } from '@/bus/query/QueryHandler';
import type { FakeResponse } from './FakeResponse';
import type { FakeViewCurrentNameQuery } from './FakeViewCurrentNameQuery';

export class FakeViewCurrentNameQueryHandler extends QueryHandler<FakeViewCurrentNameQuery, FakeResponse> {
    public readonly __TAG = 'FakeViewCurrentNameQueryHandler';

    handle(query: FakeViewCurrentNameQuery): Promise<FakeResponse> {
        return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
    }
}
