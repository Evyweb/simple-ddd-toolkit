import {Command} from "@/command/Command";

export interface ICommandHandler<TCommand extends Command, TResponse = void> {
  readonly __TAG: string;
  handle(command: TCommand): Promise<TResponse>;
}
