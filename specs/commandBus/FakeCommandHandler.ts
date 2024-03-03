import {ICommandHandler} from "../../src";
import {FakeCommand} from "./FakeCommand";
import {FakeLogger} from "../logger/FakeLogger";

export class FakeCommandHandler implements ICommandHandler<FakeCommand> {
  constructor(private readonly logger: FakeLogger) {}

  async handle(command: FakeCommand): Promise<void> {
    this.logger.log(command.name);
  }
}
