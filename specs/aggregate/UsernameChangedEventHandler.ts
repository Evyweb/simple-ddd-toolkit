import {CommandBus} from "@/commandBus/CommandBus";
import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {UsernameUpdatedEvent} from "./UsernameUpdatedEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";

export class UsernameChangedEventHandler implements IEventHandler<UsernameUpdatedEvent> {
    constructor(private readonly commandBus: CommandBus) {

    }

    async handle(event: UsernameUpdatedEvent) {
        const command = new LogUsernameChangedCommand(event.metadata.userId, event.metadata.newName);
        await this.commandBus.execute(command);
    }
}