import {ICommand} from "../command/ICommand";

export interface CommandMiddleware {
  execute(command: ICommand, next: (command: ICommand) => Promise<void>): Promise<void>;
}
