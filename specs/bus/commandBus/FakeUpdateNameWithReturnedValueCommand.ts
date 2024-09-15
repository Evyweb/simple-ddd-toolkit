import {Command} from "@/bus/command/Command";

export class FakeUpdateNameWithReturnedValueCommand extends Command {
    constructor(public readonly name: string) {
        super();
    }
}
