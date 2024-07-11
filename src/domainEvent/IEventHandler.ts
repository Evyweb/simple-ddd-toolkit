import {DomainEvent} from "@/domainEvent/DomainEvent";

export interface IEventHandler<T extends DomainEvent<any>> {
    handle(event: T): Promise<void>;
}