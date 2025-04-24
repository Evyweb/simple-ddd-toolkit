import { Query } from '@/bus/query/Query';

export class FakeViewCurrentNameQuery extends Query {
    public readonly __TAG = 'FakeViewCurrentNameQuery';

    constructor(public readonly name: string) {
        super();
    }
}
