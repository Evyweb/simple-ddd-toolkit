import {Query} from "@/bus/query/Query";

export class FakeViewCurrentNameQuery extends Query {
    constructor(public readonly name: string) {
        super();
    }
}
