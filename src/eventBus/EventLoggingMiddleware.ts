import {DomainEvent} from "@/domainEvent/DomainEvent";
import {Logger} from "@/logger/Logger";
import {IEventMiddleware} from "@/eventBus/IEventMiddleware";

export class EventLoggingMiddleware implements IEventMiddleware {
    constructor(private readonly logger: Logger) {
    }

    execute(event: DomainEvent, next: (event: DomainEvent) => Promise<void>): Promise<void> {
        this.logger.log(
            `[${event.occurredOn.toISOString()}] Event "${event.__TAG}" occurred with ID "${
                event.eventId
            }". Payload: ${JSON.stringify(event.payload)} - Metadata: ${JSON.stringify(event.metadata)}`
        );

        return next(event);
    }
}
