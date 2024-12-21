import {DomainEvent} from "@/domainEvent/DomainEvent";
import {EventBusPort} from "@/eventBus/EventBusPort";
import {UUID} from "@/valueObject/uuid/UUID";
import {Entity} from "@/entity/Entity";

export abstract class Aggregate<
    EntityData extends { id: UUID },
> extends Entity<EntityData> {
    private domainEvents: DomainEvent[] = [];

    addEvent(domainEvent: DomainEvent): void {
        this.domainEvents.push(domainEvent);
    }

    clearEvents(): void {
        this.domainEvents = [];
    }

    async dispatchEvents(bus: EventBusPort): Promise<void> {
        for (const event of this.domainEvents) {
            await bus.dispatch(event);
        }
        this.clearEvents();
    }

    dispatchEventsAsync(bus: EventBusPort): void {
        setImmediate(async () => {
            await this.dispatchEvents(bus);
        });
    }

    getEvents(): DomainEvent[] {
        const eventsToDispatch = [...this.domainEvents];
        this.clearEvents();
        return eventsToDispatch;
    }
}
