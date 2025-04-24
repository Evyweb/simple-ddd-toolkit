import type { DomainEvent } from '@/domainEvent/DomainEvent';
import type { IEventHandler } from '@/domainEvent/IEventHandler';
import type { IEventMiddleware } from './IEventMiddleware';

export interface EventBusPort {
    use(middleware: IEventMiddleware): void;

    on(eventType: string, handler: () => IEventHandler<DomainEvent>): void;

    dispatch(domainEvent: DomainEvent): Promise<void>;

    dispatchEvents(events: DomainEvent[]): Promise<void>;

    dispatchEventsAsync(events: DomainEvent[]): void;
}
