import type { DomainEvent } from '@/domainEvent/DomainEvent';
import type { IEventMiddleware } from '@/eventBus/IEventMiddleware';
import type { Logger } from '@/logger/Logger';

export class EventLoggingMiddleware implements IEventMiddleware {
    constructor(private readonly logger: Logger) {}

    execute(event: DomainEvent, next: (event: DomainEvent) => Promise<void>): Promise<void> {
        this.logger.log(
            `[${event.occurredOn.toISOString()}] Event "${event.__TAG}" occurred with ID "${
                event.eventId
            }". Payload: ${JSON.stringify(event.payload)} - Metadata: ${JSON.stringify(event.metadata)}`
        );

        return next(event);
    }
}
