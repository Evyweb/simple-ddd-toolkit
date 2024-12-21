import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {Logger} from "@/logger/Logger";
import {ICommandHandler} from "@/bus/command/ICommandHandler";

export class LogUsernameChangedCommandHandler implements ICommandHandler<LogUsernameChangedCommand> {
    readonly __TAG = 'LogUsernameChangedCommandHandler';

    constructor(private readonly logger: Logger) {
    }

    async handle({userId, newName}: LogUsernameChangedCommand): Promise<void> {
        this.logger.log(`User "${userId}" has a new name: "${newName}"`);
    }
}
