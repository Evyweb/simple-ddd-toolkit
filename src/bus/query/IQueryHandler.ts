import {IResponse} from "./IResponse";

export interface IQueryHandler<Query, Response extends IResponse> {
    handle(query: Query): Promise<Response>;
}
