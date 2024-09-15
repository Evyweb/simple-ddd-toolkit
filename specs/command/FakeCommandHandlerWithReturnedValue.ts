import {FakeCommand} from "./FakeCommand";
import {Logger} from "@/logger/Logger";
import {CommandHandler} from "@/command/CommandHandler";

export class FakeCommandHandlerWithReturnedValue extends CommandHandler<FakeCommand, boolean> {
    constructor(private readonly logger: Logger) {
        super();
    }

    async handle(command: FakeCommand): Promise<boolean> {
        this.logger.log(command.name);
        return Promise.resolve(true);
    }
}
