import {IQueryHandler} from "../query/IQueryHandler";
import {IQuery} from "../query/IQuery";
import {IResponse} from "../query/IResponse";
import {QueryMiddleware} from "../middleware/QueryMiddleware";

export class QueryBus {
  private handlers: Map<string, IQueryHandler<any, any>> = new Map();

  register<Query extends IQuery, Response extends IResponse>(
    queryType: string,
    handler: IQueryHandler<Query, Response>
  ): void {
    this.handlers.set(queryType, handler as IQueryHandler<Query, Response>);
  }

  private middlewares: QueryMiddleware[] = [];

  use(middleware: QueryMiddleware): void {
    this.middlewares.push(middleware);
  }

  async execute<Query extends IQuery, Response extends IResponse>(query: Query): Promise<Response> {
    const handler = this.handlers.get(query.type);

    const NO_HANDLER_ERROR_MESSAGE = `No handler registered for query type ${query.type}`;

    if (!handler) {
      throw new Error(NO_HANDLER_ERROR_MESSAGE);
    }

    const executeHandler = (finalQuery: IQuery) => handler.handle(finalQuery) as Promise<IResponse>;

    const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, query, next);

    const middlewareChain: (query: IQuery) => Promise<IResponse> = this.middlewares.reduceRight(
      executeMiddlewares,
      executeHandler
    );

    return (await middlewareChain(query)) as Response;
  }
}
