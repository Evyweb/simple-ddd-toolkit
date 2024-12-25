import {Command} from "@/bus/command/Command";

export class LogUsernameChangedCommand extends Command {
    readonly __TAG = "LogUsernameChangedCommand";

    constructor(
        public readonly userId: string,
        public readonly oldName: string,
        public readonly newName: string
    ) {
        super();
    }
}
