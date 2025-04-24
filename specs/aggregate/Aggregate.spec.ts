import { Bus } from '@/bus/Bus';
import type { Command } from '@/bus/command/Command';
import { EventBus } from '@/eventBus/EventBus';
import { EventLoggingMiddleware } from '@/eventBus/EventLoggingMiddleware';
import { UuidFrom } from '@/valueObject/uuid/UUIDFactory';
import { FakeLogger } from '../logger/FakeLogger';
import { FakeUserAggregate } from './FakeUserAggregate';
import { FakeUserEvents } from './FakeUserEvents';
import { LogUsernameChangedCommandHandler } from './LogUsernameChangedCommandHandler';
import { OtherEvent } from './OtherEvent';
import { UsernameChangedEventHandler } from './UsernameChangedEventHandler';
import { UsernameUpdatedEvent } from './UsernameUpdatedEvent';

describe('Aggregate', () => {
    let eventBus: EventBus;
    let logger: FakeLogger;
    let commandBus: Bus<Command>;

    beforeEach(() => {
        logger = new FakeLogger();
        eventBus = new EventBus();
        eventBus.use(new EventLoggingMiddleware(logger));
        commandBus = new Bus<Command>();
    });

    describe('When dispatching domain events', () => {
        describe('When a handler has been registered', () => {
            let aggregate: FakeUserAggregate;

            beforeEach(() => {
                commandBus.register(() => new LogUsernameChangedCommandHandler(logger));
                eventBus.on(FakeUserEvents.USER_NAME_UPDATED, () => new UsernameChangedEventHandler(commandBus));

                aggregate = FakeUserAggregate.create({
                    id: UuidFrom('15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a'),
                    name: 'John Doe',
                });

                aggregate.addEvent(new UsernameUpdatedEvent(aggregate.id(), 'John Doe', 'Jane Doe'));
                aggregate.addEvent(
                    new OtherEvent({
                        eventId: '266e27fe-1c3f-4be6-8646-358e830544d4',
                    })
                );
            });

            describe('When the dispatch is done by the event bus', () => {
                it('should trigger the registered handler', () => {
                    // Arrange
                    const events = aggregate.getEvents();

                    // Act
                    eventBus.dispatchEvents(events);

                    // Assert
                    expect(logger.messages).toHaveLength(2);

                    const [firstMessage, secondMessage] = logger.messages;
                    expect(firstMessage).toEqual(
                        `[2024-01-28T01:06:59.782Z] Event "USER_NAME_UPDATED" occurred with ID "266e27fe-1c3f-4be6-8646-358e830544d4". Payload: {"userId":"15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a","newName":"Jane Doe"} - Metadata: {"oldName":"John Doe"}`
                    );
                    expect(secondMessage).toEqual(
                        `User "John Doe" with ID: "15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a" has a new name: "Jane Doe"`
                    );
                });
            });

            describe('When the dispatch is asynchronous', () => {
                beforeEach(() => {
                    vi.useFakeTimers();
                });

                afterEach(() => {
                    vi.useRealTimers();
                });

                describe('When the dispatch is done by the event bus', () => {
                    it('should trigger the registered handler just after the execution', async () => {
                        // Arrange
                        const events = aggregate.getEvents();
                        eventBus.dispatchEventsAsync(events);

                        // Act
                        vi.runAllTimers();

                        // Assert
                        expect(logger.messages).toHaveLength(2);

                        const [firstMessage, secondMessage] = logger.messages;
                        expect(firstMessage).toEqual(
                            `[2024-01-28T01:06:59.782Z] Event "USER_NAME_UPDATED" occurred with ID "266e27fe-1c3f-4be6-8646-358e830544d4". Payload: {"userId":"15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a","newName":"Jane Doe"} - Metadata: {"oldName":"John Doe"}`
                        );
                        expect(secondMessage).toEqual(
                            `User "John Doe" with ID: "15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a" has a new name: "Jane Doe"`
                        );
                    });
                });

                describe('When the dispatch is done by the aggregate', () => {
                    it('should trigger the registered handler just after the execution', () => {
                        // Arrange
                        aggregate.dispatchEventsAsync(eventBus);

                        // Act
                        vi.runAllTimers();

                        // Assert
                        expect(logger.messages).toHaveLength(2);

                        const [firstMessage, secondMessage] = logger.messages;
                        expect(firstMessage).toEqual(
                            `[2024-01-28T01:06:59.782Z] Event "USER_NAME_UPDATED" occurred with ID "266e27fe-1c3f-4be6-8646-358e830544d4". Payload: {"userId":"15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a","newName":"Jane Doe"} - Metadata: {"oldName":"John Doe"}`
                        );
                        expect(secondMessage).toEqual(
                            `User "John Doe" with ID: "15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a" has a new name: "Jane Doe"`
                        );
                    });
                });
            });
        });

        describe('When no handler has been registered', () => {
            it('should not do anything', () => {
                // Arrange
                const aggregate = FakeUserAggregate.create({
                    id: UuidFrom('15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a'),
                    name: 'John Doe',
                });

                aggregate.addEvent(new UsernameUpdatedEvent(aggregate.id(), 'John Doe', 'Jane Doe'));

                // Act
                aggregate.dispatchEvents(eventBus);

                // Assert
                expect(logger.messages).toHaveLength(0);
            });
        });
    });
});
