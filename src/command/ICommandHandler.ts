import {Command} from "@/command/Command";

export interface ICommandHandler<TCommand extends Command, TResponse = void> {
  handle(command: TCommand): Promise<TResponse>;
}
