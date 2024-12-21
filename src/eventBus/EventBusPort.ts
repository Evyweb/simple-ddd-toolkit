import {IEventMiddleware} from "./IEventMiddleware"
import {DomainEvent} from "@/domainEvent/DomainEvent"
import {IEventHandler} from "@/domainEvent/IEventHandler"

export interface EventBusPort {
    use(middleware: IEventMiddleware): void

    on(eventType: string, handler: () => IEventHandler<DomainEvent>): void

    dispatch(domainEvent: DomainEvent): Promise<void>

    dispatchEvents(events: DomainEvent[]): Promise<void>

    dispatchEventsAsync(events: DomainEvent[]): void
}