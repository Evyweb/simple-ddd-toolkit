import {Entity} from "@/entity/Entity";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {UUID} from "@/valueObject/uuid/UUID";
import {EventBusPort} from "@/eventBus/EventBusPort";

export abstract class Aggregate<EntityData extends { id: UUID }> extends Entity<EntityData> {
    private domainEvents: DomainEvent<Record<string, any>>[] = [];

    addEvent(domainEvent: DomainEvent<Record<string, any>>): void {
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

    getEvents() {
        const eventsToDispatch = [...this.domainEvents];
        this.clearEvents();
        return eventsToDispatch;
    }
}
