import {Entity} from "@/entity/Entity";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {EventBus} from "@/eventBus/EventBus";
import {UUID} from "@/valueObject/uuid/UUID";

export abstract class Aggregate<EntityData extends { id: UUID }> extends Entity<EntityData> {
  private domainEvents: DomainEvent[] = [];

  addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  clearEvents(): void {
    this.domainEvents = [];
  }

  dispatchEvents(bus: EventBus): void {
    this.domainEvents.forEach((event) => {
      bus.dispatch(event);
    });

    this.clearEvents();
  }
}
