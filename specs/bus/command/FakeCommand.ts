import {Command} from "@/bus/command/Command";

export class FakeCommand extends Command {
    public readonly __TAG = "FakeCommand";

    constructor(public readonly name: string) {
        super();
    }
}
