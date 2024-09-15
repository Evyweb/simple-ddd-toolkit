import {IResponse} from "@/bus/query/IResponse";
import {Query} from "@/bus/query/Query";

export interface QueryMiddleware {
    execute(query: Query, next: (query: Query) => Promise<IResponse>): Promise<IResponse>;
}
