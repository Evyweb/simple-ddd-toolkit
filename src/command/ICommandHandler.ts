import {Command} from "@/command/Command";

export interface ICommandHandler<TCommand extends Command> {
  handle(command: TCommand): Promise<void>;
}
