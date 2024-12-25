import {LogUsernameChangedCommand} from "./LogUsernameChangedCommand";
import {UsernameUpdatedEvent} from "./UsernameUpdatedEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";
import {type Command} from "@/bus/command/Command";
import {type Bus} from "@/bus/Bus";

export class UsernameChangedEventHandler implements IEventHandler<UsernameUpdatedEvent> {
    public readonly __TAG = "UsernameChangedEventHandler";

    constructor(private readonly commandBus: Bus<Command>) {

    }

    async handle(event: UsernameUpdatedEvent) {
        const command = new LogUsernameChangedCommand(event.payload.userId as string, event.metadata.oldName as string, event.payload.newName as string);
        await this.commandBus.execute(command);
    }
}