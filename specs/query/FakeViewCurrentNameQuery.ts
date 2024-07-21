import {Query} from "@/query/Query";

export class FakeViewCurrentNameQuery extends Query {
    public __TAG = 'FakeViewCurrentNameQuery';
    constructor(public readonly name: string) {
        super();
    }
}
