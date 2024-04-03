import {ICommand} from "./ICommand";

export interface ICommandHandler<Command extends ICommand> {
  handle(command: Command): Promise<void>;
}
