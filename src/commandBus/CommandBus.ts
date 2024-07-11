import {ICommandHandler} from "@/command/ICommandHandler";
import {CommandMiddleware} from "@/middleware/CommandMiddleware";
import {Command} from "@/command/Command";

export class CommandBus {
    private handlers: Map<string, ICommandHandler<Command, any>> = new Map();

    register<Response>(commandType: string, handler: ICommandHandler<Command, Response>): void {
        this.handlers.set(commandType, handler as ICommandHandler<Command, Response>);
    }

    private middlewares: CommandMiddleware[] = [];

    use(middleware: CommandMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute<Response>(command: Command): Promise<Response> {
        const handler = this.handlers.get(command.__TAG);

        if (!handler) {
            throw new Error(`No handler registered for command type ${command.__TAG}`);
        }

        const executeHandler = (finalCommand: Command) => handler.handle(finalCommand) as Promise<Response>;

        const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, command, next);

        const middlewareChain: (command: Command) => Promise<Response> = this.middlewares.reduceRight(
            executeMiddlewares,
            executeHandler
        );

        return (await middlewareChain(command)) as Response;
    }
}
