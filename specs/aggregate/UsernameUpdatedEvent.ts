import { DomainEvent } from '@/domainEvent/DomainEvent';
import { UuidFrom } from '@/valueObject/uuid/UUIDFactory';
import { FakeUserEvents } from './FakeUserEvents';

export class UsernameUpdatedEvent extends DomainEvent {
    readonly __TAG: string = FakeUserEvents.USER_NAME_UPDATED;

    constructor(userId: string, oldName: string, newName: string) {
        super({
            eventId: UuidFrom('266e27fe-1c3f-4be6-8646-358e830544d4').get(
                'value'
            ),
            occurredOn: new Date(Date.UTC(2024, 0, 28, 1, 6, 59, 782)),
            payload: {
                userId,
                newName,
            },
            metadata: {
                oldName,
            },
        });
    }
}
