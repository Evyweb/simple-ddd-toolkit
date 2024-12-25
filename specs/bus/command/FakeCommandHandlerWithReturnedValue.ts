import {FakeCommand} from "./FakeCommand";
import {Logger} from "@/logger/Logger";
import {CommandHandler} from "@/bus/command/CommandHandler";

export class FakeCommandHandlerWithReturnedValue extends CommandHandler<FakeCommand, boolean> {
    public readonly __TAG = "FakeCommandHandlerWithReturnedValue";

    constructor(private readonly logger: Logger) {
        super();
    }

    async handle(command: FakeCommand): Promise<boolean> {
        this.logger.log(command.name);
        return Promise.resolve(true);
    }
}
