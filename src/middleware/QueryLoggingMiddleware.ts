import {QueryMiddleware} from "./QueryMiddleware";
import {Logger} from "../logger/Logger";
import {IQuery} from "../query/IQuery";
import {IResponse} from "../query/IResponse";

export class QueryLoggingMiddleware implements QueryMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly middlewareId: string
  ) {}

  execute(query: IQuery, next: (query: IQuery) => Promise<IResponse>): Promise<IResponse> {
    const date = new Date().toISOString();
    this.logger.log(`[${date}][${this.middlewareId}][${query.type}] - ${JSON.stringify(query)}`);
    return next(query);
  }
}
