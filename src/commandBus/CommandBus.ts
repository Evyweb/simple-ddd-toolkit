import {ICommandHandler} from "@/command/ICommandHandler";
import {CommandMiddleware} from "@/middleware/CommandMiddleware";
import {Command} from "@/command/Command";

export class CommandBus {
    private handlers: Map<string, ICommandHandler<Command>> = new Map();

    register(commandType: string, handler: ICommandHandler<Command>): void {
        this.handlers.set(commandType, handler);
    }

    private middlewares: CommandMiddleware[] = [];

    use(middleware: CommandMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute(command: Command): Promise<void> {
        const handler = this.handlers.get(command.__TAG);

        if (!handler) {
            throw new Error(`No handler registered for command type ${command.__TAG}`);
        }

        const middlewareChain = this.middlewares.reduceRight(
            (next, middleware) => (currentCommand: Command) => middleware.execute(currentCommand, next),
            async (finalCommand: Command) => {
                await handler.handle(finalCommand);
            }
        );

        await middlewareChain(command);
    }
}
