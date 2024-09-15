import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {UsernameUpdatedEvent} from "./UsernameUpdatedEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";
import {type Command} from "@/bus/command/Command";
import {type Bus} from "@/bus/Bus";

export class UsernameChangedEventHandler implements IEventHandler<UsernameUpdatedEvent> {
    constructor(private readonly commandBus: Bus<Command>) {

    }

    async handle(event: UsernameUpdatedEvent) {
        const command = new LogUsernameChangedCommand(event.metadata.userId, event.metadata.newName);
        await this.commandBus.execute(command);
    }
}