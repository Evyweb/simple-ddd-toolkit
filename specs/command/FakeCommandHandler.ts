import {ICommandHandler, Logger} from "../../src";
import {FakeCommand} from "./FakeCommand";

export class FakeCommandHandler implements ICommandHandler<FakeCommand> {
  constructor(private readonly logger: Logger) {}

  async handle(command: FakeCommand): Promise<void> {
    this.logger.log(command.name);
  }
}
