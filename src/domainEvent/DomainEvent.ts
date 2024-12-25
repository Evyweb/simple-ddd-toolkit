import {Uuid} from "@/valueObject/uuid/UUIDFactory";
import {Message} from "@/bus/Message";
import {Metadata} from "@/domainEvent/Metadata";
import {Payload} from "@/domainEvent/Payload";

interface DomainEventData {
    eventId?: string;
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

    public constructor(eventData?: DomainEventData) {
        this.eventId = eventData?.eventId || Uuid().get("value");
        this.occurredOn = eventData?.occurredOn || new Date();
        this.metadata = eventData?.metadata || {}
        this.payload = eventData?.payload || {}
    }
}
