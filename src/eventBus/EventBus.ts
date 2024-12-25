import { EventBusPort } from "./EventBusPort"
import { IEventMiddleware } from "./IEventMiddleware"
import { DomainEvent } from "@/domainEvent/DomainEvent"
import { IEventHandler } from "@/domainEvent/IEventHandler"

type ChainFunction = (event: DomainEvent) => Promise<void>

export class EventBus implements EventBusPort {
    private middlewares: IEventMiddleware[] = []
    private readonly handlers: Record<string, (() => IEventHandler<DomainEvent>)[]> = {}

    use(middleware: IEventMiddleware): void {
        this.middlewares.push(middleware)
    }

    on(eventType: string, handler: () => IEventHandler<DomainEvent>): void {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = []
        }
        this.handlers[eventType].push(handler)
    }

    async dispatch(domainEvent: DomainEvent): Promise<void> {
        const handlers = this.handlers[domainEvent.__TAG]

        const executeHandlers: ChainFunction = async (event: DomainEvent) => {
            if (!handlers) return
            for (const handlerFactory of handlers) {
                const handler = handlerFactory()
                await handler.handle(event)
            }
        }

        if (!handlers || handlers.length === 0) {
            await executeHandlers(domainEvent)
            return
        }

        const middlewareChain = this.middlewares.reduceRight<ChainFunction>(
            (next, middleware) => {
                return async (event: DomainEvent) => {
                    await middleware.execute(event, next)
                }
            },
            executeHandlers
        )

        await middlewareChain(domainEvent)
    }

    async dispatchEvents(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            await this.dispatch(event)
        }
    }

    dispatchEventsAsync(events: DomainEvent[]): void {
        setImmediate(async () => {
            for (const event of events) {
                await this.dispatch(event)
            }
        })
    }
}
