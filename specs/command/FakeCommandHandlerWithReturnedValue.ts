import {FakeCommand} from "./FakeCommand";
import {ICommandHandler} from "@/command/ICommandHandler";
import {Logger} from "@/logger/Logger";

export class FakeCommandHandlerWithReturnedValue implements ICommandHandler<FakeCommand, boolean> {
    constructor(private readonly logger: Logger) {
    }

    async handle(command: FakeCommand): Promise<boolean> {
        this.logger.log(command.name);
        return Promise.resolve(true);
    }
}
