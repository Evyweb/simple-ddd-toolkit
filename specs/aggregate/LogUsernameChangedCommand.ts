import {Command} from "@/bus/command/Command";

export class LogUsernameChangedCommand extends Command {
    constructor(
        public readonly userId: string,
        public readonly newName: string
    ) {
        super();
    }
}
