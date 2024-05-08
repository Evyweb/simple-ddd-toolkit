import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {ICommandHandler} from "@/command/ICommandHandler";

export class DoNothingCommandHandler implements ICommandHandler<LogUsernameChangedCommand> {
    async handle(_command: LogUsernameChangedCommand): Promise<void> {
    }
}
