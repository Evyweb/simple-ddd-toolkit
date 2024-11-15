import {Uuid} from "@/valueObject/uuid/UUIDFactory";

import {Message} from "@/bus/Message";

namespace DomainEvent {
    export interface Data {
        eventId: string,
        eventType: string,
        occurredOn: Date,
        metadata: Record<string, any>
    }
}

export abstract class DomainEvent<Metadata extends Record<string, any>> implements Message {
    readonly __TAG: string = this.constructor.name;

    public readonly eventId: string;
    public readonly eventType: string;
    public readonly occurredOn: Date;
    public readonly metadata: Metadata;

    public constructor(eventData?: Partial<DomainEvent.Data>) {
        this.eventId = eventData?.eventId || Uuid().get('value');
        this.eventType = eventData?.eventType || this.constructor.name;
        this.occurredOn = eventData?.occurredOn || new Date();
        this.metadata = eventData?.metadata as Metadata || {} as Metadata;
    }
}
