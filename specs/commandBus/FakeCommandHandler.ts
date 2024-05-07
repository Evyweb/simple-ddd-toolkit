import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {ICommandHandler} from "@/command/ICommandHandler";

export class FakeCommandHandler implements ICommandHandler<FakeUpdateNameCommand> {
  constructor(private readonly logger: FakeLogger) {}

  async handle(command: FakeUpdateNameCommand): Promise<void> {
    this.logger.log(command.name);
  }
}
