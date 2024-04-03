import { Logger } from '../../src';
import {ICommandHandler} from "../../src";
import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";

export class LogUsernameChangedCommandHandler implements ICommandHandler<LogUsernameChangedCommand> {
  constructor(private readonly logger: Logger) {}

  async handle({ userId, newName }: LogUsernameChangedCommand): Promise<void> {
    this.logger.log(`User "${userId}" has a new name: "${newName}"`);
  }
}
