import {EventBus} from "@/eventBus/EventBus";
import {UuidFrom} from "@/valueObject/uuid/UUIDFactory";
import {FakeLogger} from "../logger/FakeLogger";
import {LogUsernameChangedCommandHandler} from "./LogUsernameChangedCommandHandler";
import {FakeUserEvents} from "./FakeUserEvents";
import {FakeUserAggregate} from "./FakeUserAggregate";
import {UsernameUpdatedEvent} from "./UsernameUpdatedEvent";
import {OtherEvent} from "./OtherEvent";
import {CommandBus} from "@/commandBus/CommandBus";
import {UsernameChangedEventHandler} from "./UsernameChangedEventHandler";

describe('Aggregate', () => {
    let eventBus: EventBus;
    let logger: FakeLogger;
    let commandBus: CommandBus;

    beforeEach(() => {
        logger = new FakeLogger();
        eventBus = new EventBus(logger);
        commandBus = new CommandBus();
    });

    describe('When dispatching domain events', () => {
        describe('When a handler has been registered', () => {
            let aggregate: FakeUserAggregate;

            beforeEach(() => {
                commandBus.register('LogUsernameChangedCommandHandler', () => new LogUsernameChangedCommandHandler(logger));
                eventBus.on(FakeUserEvents.USER_NAME_UPDATED, () => new UsernameChangedEventHandler(commandBus));

                aggregate = FakeUserAggregate.create({
                    id: UuidFrom('15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a'),
                    name: 'John Doe',
                });

                aggregate.addEvent(new UsernameUpdatedEvent(aggregate.id(), 'Jane Doe'));
                aggregate.addEvent(new OtherEvent());
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
                        `[2024-01-28T01:06:59.782Z] Event "USER_NAME_UPDATED" occurred with ID "266e27fe-1c3f-4be6-8646-358e830544d4". Metadata: {"userId":"15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a","newName":"Jane Doe"}`
                    );
                    expect(secondMessage).toEqual(`User "15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a" has a new name: "Jane Doe"`);
                });
            });

            describe('When the dispatch is done by the aggregate', () => {
                it('should trigger the registered handler', () => {
                    // Act
                    aggregate.dispatchEvents(eventBus);

                    // Assert
                    expect(logger.messages).toHaveLength(2);

                    const [firstMessage, secondMessage] = logger.messages;
                    expect(firstMessage).toEqual(
                        `[2024-01-28T01:06:59.782Z] Event "USER_NAME_UPDATED" occurred with ID "266e27fe-1c3f-4be6-8646-358e830544d4". Metadata: {"userId":"15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a","newName":"Jane Doe"}`
                    );
                    expect(secondMessage).toEqual(`User "15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a" has a new name: "Jane Doe"`);
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

                aggregate.addEvent(new UsernameUpdatedEvent(aggregate.id(), 'Jane Doe'));

                // Act
                aggregate.dispatchEvents(eventBus);

                // Assert
                expect(logger.messages).toHaveLength(0);
            });
        });
    });
});
