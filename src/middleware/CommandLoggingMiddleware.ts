import {CommandMiddleware} from "./CommandMiddleware";
import {Logger} from "@/logger/Logger";
import {Command} from "@/command/Command";

export class CommandLoggingMiddleware implements CommandMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly middlewareId: string
  ) {}

  async execute<Response>(command: Command, next: (command: Command) => Promise<Response>): Promise<Response> {
    const date = new Date().toISOString();
    this.logger.log(`[${date}][${this.middlewareId}][${command.__TAG}] - ${JSON.stringify(command)}`);
    return next(command);
  }
}
