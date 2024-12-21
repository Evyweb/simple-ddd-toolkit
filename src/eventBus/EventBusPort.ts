import {DomainEvent} from "@/domainEvent/DomainEvent";

export interface EventBusPort {
    dispatch<EventTypes extends DomainEvent>(domainEvent: EventTypes): Promise<void>;

    dispatchEvents<EventTypes extends DomainEvent>(events: EventTypes[]): Promise<void>;

    dispatchEventsAsync<EventTypes extends DomainEvent>(events: EventTypes[]): void;
}
