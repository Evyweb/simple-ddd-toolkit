import {ICommandHandler} from "../command/ICommandHandler";
import {ICommand} from "../command/ICommand";
import {CommandMiddleware} from "../middleware/CommandMiddleware";

export class CommandBus {
  private handlers: Map<string, ICommandHandler<ICommand>> = new Map();

  register<T extends ICommand>(commandType: string, handler: ICommandHandler<T>): void {
    this.handlers.set(commandType, handler as ICommandHandler<ICommand>);
  }

  private middlewares: CommandMiddleware[] = [];

  use(middleware: CommandMiddleware): void {
    this.middlewares.push(middleware);
  }

  async execute(command: ICommand): Promise<void> {
    const handler = this.handlers.get(command.type);

    if (!handler) {
      throw new Error(`No handler registered for command type ${command.type}`);
    }

    const middlewareChain = this.middlewares.reduceRight(
      (next, middleware) => (currentCommand: ICommand) => middleware.execute(currentCommand, next),
      async (finalCommand: ICommand) => {
        await handler.handle(finalCommand);
      }
    );

    await middlewareChain(command);
  }
}
