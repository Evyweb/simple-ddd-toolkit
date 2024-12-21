import {DomainEvent} from "@/domainEvent/DomainEvent"

export interface IEventMiddleware {
    execute(event: DomainEvent, next: (event: DomainEvent) => Promise<void>): Promise<void>
}