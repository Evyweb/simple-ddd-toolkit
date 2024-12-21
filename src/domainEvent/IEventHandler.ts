import {DomainEvent} from "@/domainEvent/DomainEvent";

export interface IEventHandler<T extends DomainEvent> {
    handle(event: T): Promise<void>;
}