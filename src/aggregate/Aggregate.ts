import {Entity} from "@/entity/Entity";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {EventBus} from "@/eventBus/EventBus";
import {UUID} from "@/valueObject/uuid/UUID";

export abstract class Aggregate<EntityData extends { id: UUID }> extends Entity<EntityData> {
  private domainEvents: DomainEvent<Record<string, any>>[] = [];

  addEvent(domainEvent: DomainEvent<Record<string, any>>): void {
    this.domainEvents.push(domainEvent);
  }

  clearEvents(): void {
    this.domainEvents = [];
  }

  async dispatchEvents(bus: EventBus): Promise<void> {
    for (const event of this.domainEvents) {
      await bus.dispatch(event);
    }

    this.clearEvents();
  }
}
