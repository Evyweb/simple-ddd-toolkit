import {Logger} from "@/logger/Logger";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";

export interface EventBusPort {
  readonly logger: Logger;
  readonly handlers: Record<string, IEventHandler<DomainEvent>[]>;

  on(eventType: string, handler: IEventHandler<DomainEvent>): void;

  dispatch(domainEvent: DomainEvent): void;
}
