import {EventBusPort} from "./EventBusPort";
import {Logger} from "@/logger/Logger";
import {DomainEvent} from "@/domainEvent/DomainEvent";

export class EventBus implements EventBusPort {
  constructor(readonly logger: Logger) {}

  readonly handlers: Record<string, Function[]> = {};

  on(eventType: string, handler: Function): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }

    this.handlers[eventType].push(handler);
  }

  dispatch(domainEvent: DomainEvent): void {
    const handlers = this.handlers[domainEvent.eventType];

    if (!handlers) return;

    handlers.forEach((handler) => {
      this.logger.log(
        `[${domainEvent.occurredOn.toISOString()}] Event "${domainEvent.eventType}" occurred with ID "${
          domainEvent.eventId
        }". Metadata: ${JSON.stringify(domainEvent.metadata)}`
      );
      handler(domainEvent.metadata);
    });
  }
}
