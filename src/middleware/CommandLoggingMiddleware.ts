import {CommandMiddleware} from "./CommandMiddleware";
import {Logger} from "../logger/Logger";
import {ICommand} from "../command/ICommand";

export class CommandLoggingMiddleware implements CommandMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly middlewareId: string
  ) {}

  async execute(command: ICommand, next: (command: ICommand) => Promise<void>): Promise<void> {
    const date = new Date().toISOString();
    this.logger.log(`[${date}][${this.middlewareId}][${command.type}] - ${JSON.stringify(command)}`);
    await next(command);
  }
}
