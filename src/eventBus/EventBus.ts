import {EventBusPort} from "./EventBusPort";
import {Logger} from "@/logger/Logger";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";

export class EventBus implements EventBusPort {
  constructor(readonly logger: Logger) {}

  readonly handlers: Record<string, IEventHandler<DomainEvent<any>>[]> = {};

  on(eventType: string, handler: IEventHandler<DomainEvent<any>>): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }

    this.handlers[eventType].push(handler);
  }

  async dispatch(domainEvent: DomainEvent<any>): Promise<void> {
    const handlers = this.handlers[domainEvent.eventType];

    if (!handlers) return;

    for (const handler of handlers) {
      this.logger.log(
          `[${domainEvent.occurredOn.toISOString()}] Event "${domainEvent.eventType}" occurred with ID "${
              domainEvent.eventId
          }". Metadata: ${JSON.stringify(domainEvent.metadata)}`
      );
      await handler.handle(domainEvent);
    }
  }
}
