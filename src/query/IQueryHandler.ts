import {IResponse} from "./IResponse";

export interface IQueryHandler<Query, Response extends IResponse> {
    readonly __TAG: string;
    handle(query: Query): Promise<Response>;
}
