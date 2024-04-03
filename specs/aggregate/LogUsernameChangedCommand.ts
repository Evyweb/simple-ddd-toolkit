import {ICommand} from "../../src";

export interface LogUsernameChangedCommand extends ICommand {
  userId: string;
  newName: string;
}
