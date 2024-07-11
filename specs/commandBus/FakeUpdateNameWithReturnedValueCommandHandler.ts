import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";
import {FakeLogger} from "../logger/FakeLogger";
import {ICommandHandler} from "@/command/ICommandHandler";

export class FakeUpdateNameWithReturnedValueCommandHandler implements ICommandHandler<FakeUpdateNameCommand, string> {
  constructor(private readonly logger: FakeLogger) {}

  async handle(command: FakeUpdateNameCommand): Promise<string> {
    this.logger.log(command.name);
    return Promise.resolve(command.name);
  }
}