import {IQuery} from "../query/IQuery";
import {IResponse} from "../query/IResponse";

export interface QueryMiddleware {
  execute(query: IQuery, next: (query: IQuery) => Promise<IResponse>): Promise<IResponse>;
}
