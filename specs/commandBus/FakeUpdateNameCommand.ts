import {Command} from "@/command/Command";

export class FakeUpdateNameCommand extends Command {
    constructor(public readonly name: string) {
        super();
    }
}
