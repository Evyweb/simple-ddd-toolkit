import {FakeUserEvents} from "./FakeUserEvents";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {UuidFrom} from "@/valueObject/uuid/UUIDFactory";

export class UsernameUpdatedEvent extends DomainEvent {
    constructor(userId: string, newName: string) {
        super({
            eventId: UuidFrom('266e27fe-1c3f-4be6-8646-358e830544d4').get('value'),
            eventType: FakeUserEvents.USER_NAME_UPDATED,
            occurredOn: new Date(Date.UTC(2024, 0, 28, 1, 6, 59, 782)),
            metadata: {
                userId,
                newName,
            },
        });
    }
}
