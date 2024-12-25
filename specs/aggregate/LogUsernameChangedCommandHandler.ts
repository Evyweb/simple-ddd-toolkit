import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {Logger} from "@/logger/Logger";
import {CommandHandler} from "@/bus/command/CommandHandler";

export class LogUsernameChangedCommandHandler extends CommandHandler<LogUsernameChangedCommand> {
    readonly __TAG = 'LogUsernameChangedCommandHandler';

    constructor(private readonly logger: Logger) {
        super();
    }

    async handle({userId, oldName, newName}: LogUsernameChangedCommand): Promise<void> {
        this.logger.log(`User "${oldName}" with ID: "${userId}" has a new name: "${newName}"`);
    }
}
