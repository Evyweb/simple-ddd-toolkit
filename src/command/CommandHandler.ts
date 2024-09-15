import {ICommandHandler} from "@/command/ICommandHandler";
import {Command} from "@/command/Command";

export abstract class CommandHandler<TCommand extends Command, TResponse = void> implements ICommandHandler<TCommand, TResponse> {
    public readonly __TAG: string = this.constructor.name;
    abstract handle(command: TCommand): Promise<TResponse>;
}