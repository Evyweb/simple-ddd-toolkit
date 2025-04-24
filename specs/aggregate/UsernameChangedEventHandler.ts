import type { Bus } from '@/bus/Bus';
import type { Command } from '@/bus/command/Command';
import type { IEventHandler } from '@/domainEvent/IEventHandler';
import { LogUsernameChangedCommand } from './LogUsernameChangedCommand';
import type { UsernameUpdatedEvent } from './UsernameUpdatedEvent';

export class UsernameChangedEventHandler
    implements IEventHandler<UsernameUpdatedEvent>
{
    public readonly __TAG = 'UsernameChangedEventHandler';

    constructor(private readonly commandBus: Bus<Command>) {}

    async handle(event: UsernameUpdatedEvent) {
        const command = new LogUsernameChangedCommand(
            event.payload.userId as string,
            event.metadata.oldName as string,
            event.payload.newName as string
        );
        await this.commandBus.execute(command);
    }
}
