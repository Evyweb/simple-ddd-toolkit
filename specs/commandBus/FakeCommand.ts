import {ICommand} from "../../src/command/ICommand";

export interface FakeCommand extends ICommand {
  name: string;
}
