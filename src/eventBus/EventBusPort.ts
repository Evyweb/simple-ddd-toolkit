import {Logger} from "@/logger/Logger";
import {DomainEvent} from "@/domainEvent/DomainEvent";
import {IEventHandler} from "@/domainEvent/IEventHandler";

export interface EventBusPort {
    readonly logger: Logger;
    readonly handlers: Record<string, (() => IEventHandler<DomainEvent<any>>)[]>;

    on(eventType: string, handler: () => IEventHandler<DomainEvent<Record<string, any>>>): void;

    dispatch(domainEvent: DomainEvent<Record<string, any>>): Promise<void>;

    dispatchEvents(events: DomainEvent<Record<string, any>>[]): Promise<void>;
}
