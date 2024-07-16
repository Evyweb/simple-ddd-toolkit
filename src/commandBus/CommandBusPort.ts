import {ICommandHandler} from "@/command/ICommandHandler";
import {Command} from "@/command/Command";
import {CommandMiddleware} from "@/middleware/CommandMiddleware";

export interface CommandBusPort {
    register<Response>(handler: ICommandHandler<Command, Response>): void;

    use(middleware: CommandMiddleware): void;

    execute<Response>(command: Command): Promise<Response>;
}