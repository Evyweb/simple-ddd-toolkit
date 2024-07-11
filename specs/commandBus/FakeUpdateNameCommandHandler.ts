import {FakeLogger} from "../logger/FakeLogger";
import {ICommandHandler} from "@/command/ICommandHandler";
import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";

export class FakeUpdateNameCommandHandler implements ICommandHandler<FakeUpdateNameCommand> {
  constructor(private readonly logger: FakeLogger) {}

  async handle(command: FakeUpdateNameCommand): Promise<void> {
    this.logger.log(command.name);
  }
}
