import type { Message } from '@/bus/Message';
import type { Metadata } from '@/domainEvent/Metadata';
import type { Payload } from '@/domainEvent/Payload';

interface DomainEventData {
    eventId: string;
    occurredOn?: Date;
    payload?: Payload;
    metadata?: Metadata;
}

export abstract class DomainEvent implements Message {
    abstract readonly __TAG: string;

    public readonly eventId: string;
    public readonly occurredOn: Date;
    public readonly payload: Payload;
    public readonly metadata: Metadata;

    public constructor(eventData: DomainEventData) {
        this.eventId = eventData.eventId;
        this.occurredOn = eventData?.occurredOn || new Date();
        this.metadata = eventData?.metadata || {};
        this.payload = eventData?.payload || {};
    }
}
