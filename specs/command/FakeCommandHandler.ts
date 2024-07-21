import {FakeCommand} from "./FakeCommand";
import {ICommandHandler} from "@/command/ICommandHandler";
import {Logger} from "@/logger/Logger";

export class FakeCommandHandler implements ICommandHandler<FakeCommand> {

  readonly __TAG = 'FakeCommandHandler';

  constructor(private readonly logger: Logger) {}

  async handle(command: FakeCommand): Promise<void> {
    this.logger.log(command.name);
  }
}
