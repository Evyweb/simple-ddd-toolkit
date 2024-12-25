import {Query} from "@/bus/query/Query";
import {IResponse} from "@/bus/query/IResponse";

export abstract class QueryHandler<TQuery extends Query, TResponse extends IResponse> {
    public abstract readonly __TAG: string;

    public abstract handle(query: TQuery): Promise<TResponse>;
}