import {IResponse} from "@/query/IResponse";
import {Query} from "@/query/Query";

export interface QueryMiddleware {
    execute(query: Query, next: (query: Query) => Promise<IResponse>): Promise<IResponse>;
}
