import {DomainEvent} from "../../src/domainEvent/DomainEvent";
import {UuidFrom} from "../../src";
import {FakeUserEvents} from "./FakeUserEvents";

export class UpdateUsernameEvent implements DomainEvent {
  eventId: string;

  eventType: string;

  occurredOn: Date;

  metadata: Record<string, any>;

  constructor(userId: string, newName: string) {
    this.eventId = UuidFrom('266e27fe-1c3f-4be6-8646-358e830544d4').get('value');
    this.eventType = FakeUserEvents.USER_NAME_UPDATED;
    this.occurredOn = new Date(Date.UTC(2024, 0, 28, 1, 6, 59, 782));
    this.metadata = {
      userId,
      newName,
    };
  }
}
