import {DomainEvent} from "@/domainEvent/DomainEvent";

namespace OtherEvent {
    export interface Metadata {
        otherField: string;
    }
}

export class OtherEvent extends DomainEvent<OtherEvent.Metadata> {
}
