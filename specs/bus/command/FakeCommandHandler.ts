import {FakeCommand} from "./FakeCommand";
import {Logger} from "@/logger/Logger";
import {CommandHandler} from "@/bus/command/CommandHandler";

export class FakeCommandHandler extends CommandHandler<FakeCommand, void> {
    constructor(private readonly logger: Logger) {
        super();
    }

    async handle(command: FakeCommand): Promise<void> {
        this.logger.log(command.name);
    }
}