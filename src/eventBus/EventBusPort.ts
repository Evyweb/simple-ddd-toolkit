import {Logger} from "../logger/Logger";
import {DomainEvent} from "../domainEvent/DomainEvent";

export interface EventBusPort {
  readonly logger: Logger;
  readonly handlers: Record<string, Function[]>;

  on(eventType: string, handler: Function): void;

  dispatch(domainEvent: DomainEvent): void;
}
