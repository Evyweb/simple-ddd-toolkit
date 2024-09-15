import {IQueryHandler} from "@/bus/query/IQueryHandler";
import {Query} from "@/bus/query/Query";
import {IResponse} from "@/bus/query/IResponse";

export abstract class QueryHandler<TQuery extends Query, TResponse extends IResponse> implements IQueryHandler<TQuery, TResponse> {
    public abstract handle(query: TQuery): Promise<TResponse>;
}