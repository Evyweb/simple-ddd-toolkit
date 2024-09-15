import {IResponse} from "@/query/IResponse";
import {IQueryHandler} from "@/query/IQueryHandler";
import {Query} from "@/query/Query";
import {QueryMiddleware} from "@/middleware/QueryMiddleware";

export interface QueryBusPort {
    register<Response extends IResponse>(key: string, handler: () => IQueryHandler<Query, Response>): void;

    use(middleware: QueryMiddleware): void;

    execute<Response extends IResponse>(query: Query): Promise<Response>;
}