import {Query} from "@/bus/query/Query";

export abstract class QueryHandler<TQuery extends Query, TResponse> {
    public abstract readonly __TAG: string;

    public abstract handle(query: TQuery): Promise<TResponse>;
}