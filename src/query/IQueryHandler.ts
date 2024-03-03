import {IQuery} from "./IQuery";
import {IResponse} from "./IResponse";

export interface IQueryHandler<Query extends IQuery, Response extends IResponse> {
  handle(query: Query): Promise<Response>;
}
