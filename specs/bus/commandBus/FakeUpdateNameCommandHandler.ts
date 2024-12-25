import {FakeLogger} from "../../logger/FakeLogger";
import {FakeUpdateNameCommand} from "./FakeUpdateNameCommand";
import {CommandHandler} from "@/bus/command/CommandHandler";

export class FakeUpdateNameCommandHandler extends CommandHandler<FakeUpdateNameCommand> {
    readonly __TAG: string = 'FakeUpdateNameCommandHandler';

    constructor(private readonly logger: FakeLogger) {
        super();
    }

    async handle(command: FakeUpdateNameCommand): Promise<void> {
        this.logger.log(command.name);
    }
}
