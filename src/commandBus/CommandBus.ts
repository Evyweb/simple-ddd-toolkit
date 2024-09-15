import {ICommandHandler} from "@/command/ICommandHandler";
import {CommandMiddleware} from "@/middleware/CommandMiddleware";
import {Command} from "@/command/Command";
import {CommandBusPort} from "@/commandBus/CommandBusPort";

export class CommandBus implements CommandBusPort {
    private handlers: Map<string, () => ICommandHandler<Command, any>> = new Map();
    private middlewares: CommandMiddleware[] = [];

    register<Response>(key: string, handler: () => ICommandHandler<Command, Response>): void {
        this.handlers.set(key, handler as () => ICommandHandler<Command, Response>);
    }

    use(middleware: CommandMiddleware): void {
        this.middlewares.push(middleware);
    }

    async execute<Response>(command: Command): Promise<Response> {
        const handlerName = `${command.__TAG}Handler`;
        const handlerFactory = this.handlers.get(handlerName);

        if (!handlerFactory) {
            throw new Error(`No handler registered for command type ${handlerName}`);
        }

        const handler = handlerFactory();
        const executeHandler = (finalCommand: Command) => handler.handle(finalCommand) as Promise<Response>;

        const executeMiddlewares = (next: any, middleware: any) => middleware.execute.bind(middleware, command, next);

        const middlewareChain: (command: Command) => Promise<Response> = this.middlewares.reduceRight(
            executeMiddlewares,
            executeHandler
        );

        return (await middlewareChain(command)) as Response;
    }
}
