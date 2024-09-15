import {IQueryHandler} from "@/query/IQueryHandler";
import {Query} from "@/query/Query";
import {IResponse} from "@/query/IResponse";

export abstract class QueryHandler<TQuery extends Query, TResponse extends IResponse> implements IQueryHandler<TQuery, TResponse> {
    readonly __TAG: string = this.constructor.name;
    public abstract handle(query: TQuery): Promise<TResponse>;
}