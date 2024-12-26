import {ICommandHandler} from "@/bus/command/ICommandHandler";
import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";
import {Command} from "@/bus/command/Command";

export class FakeInvalidCommand extends Command {
    readonly __TAG: string = "";

    constructor(public readonly name: string) {
        super();
    }
}

export class FakeInvalidCommandHandler implements ICommandHandler<FakeUpdateNameCommand, string> {
    readonly __TAG: string = '';

    handle(command: FakeInvalidCommand): Promise<string> {
        return Promise.resolve(command.__TAG)
    }
}