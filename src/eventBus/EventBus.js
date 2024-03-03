export class EventBus {
    constructor(logger) {
        this.logger = logger;
        this.handlers = {};
    }
    on(eventType, handler) {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }
    dispatch(domainEvent) {
        const handlers = this.handlers[domainEvent.eventType];
        if (!handlers)
            return;
        handlers.forEach((handler) => {
            this.logger.log(`[${domainEvent.occurredOn.toISOString()}] Event "${domainEvent.eventType}" occurred with ID "${domainEvent.eventId}". Metadata: ${JSON.stringify(domainEvent.metadata)}`);
            handler(domainEvent.metadata);
        });
    }
}
//# sourceMappingURL=EventBus.js.map