import type { DomainEvent } from '@/domainEvent/DomainEvent';

export interface IEventHandler<T extends DomainEvent> {
    readonly __TAG: string;

    handle(event: T): Promise<void>;
}
