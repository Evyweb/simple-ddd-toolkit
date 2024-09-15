import {Command} from "@/bus/command/Command";

export class FakeCommand extends Command {
    constructor(public readonly name: string) {
        super();
    }
}
