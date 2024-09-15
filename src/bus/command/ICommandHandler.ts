import {Command} from "@/bus/command/Command";

export interface ICommandHandler<TCommand extends Command, TResponse = void> {
  handle(command: TCommand): Promise<TResponse>;
}
