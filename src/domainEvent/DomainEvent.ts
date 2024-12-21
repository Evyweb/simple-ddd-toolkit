import {Uuid} from "@/valueObject/uuid/UUIDFactory";
import {Message} from "@/bus/Message";
import {Metadata} from "@/domainEvent/Metadata";

interface DomainEventData {
    eventId?: string;
    eventType?: string;
    occurredOn?: Date;
    metadata?: Metadata;
}

export abstract class DomainEvent implements Message {
    readonly __TAG: string = this.constructor.name;

    public readonly eventId: string;
    public readonly eventType: string;
    public readonly occurredOn: Date;
    public readonly metadata: Metadata;

    public constructor(eventData?: DomainEventData) {
        this.eventId = eventData?.eventId || Uuid().get("value");
        this.eventType = eventData?.eventType || this.constructor.name;
        this.occurredOn = eventData?.occurredOn || new Date();
        this.metadata = eventData?.metadata || {}
    }
}
