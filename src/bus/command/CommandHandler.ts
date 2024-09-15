import {ICommandHandler} from "@/bus/command/ICommandHandler";
import {Command} from "@/bus/command/Command";

export abstract class CommandHandler<TCommand extends Command, TResponse = void> implements ICommandHandler<TCommand, TResponse> {
    abstract handle(command: TCommand): Promise<TResponse>;
}