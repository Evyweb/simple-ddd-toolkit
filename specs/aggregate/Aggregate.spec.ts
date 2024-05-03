import {FakeLogger} from "../logger/FakeLogger";
import {EventBus, UuidFrom} from "../../src";
import {LogUsernameChangedCommandHandler} from "./LogUsernameChangedCommandHandler";
import {FakeUserEvents} from "./FakeUserEvents";
import {FakeUserAggregate} from "./FakeUserAggregate";
import {describe, expect, it} from "vitest";

describe('When dispatchEvents is called', () => {
    describe('When a handler has been registered', () => {
        it('should trigger the registered handler', () => {
            // Arrange
            const logger = new FakeLogger();
            const eventBus = new EventBus(logger);
            const userNameChangedHandler = new LogUsernameChangedCommandHandler(logger);
            eventBus.on(FakeUserEvents.USER_NAME_UPDATED, userNameChangedHandler.handle.bind(userNameChangedHandler));

            const aggregate = FakeUserAggregate.create({
                id: UuidFrom('15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a'),
                name: 'John Doe',
            });

            aggregate.updateName('Jane Doe');

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

    describe('When no handler has been registered', () => {
        it('should not do anything', () => {
            // Arrange
            const logger = new FakeLogger();
            const eventBus = new EventBus(logger);

            const aggregate = FakeUserAggregate.create({
                id: UuidFrom('15e4c6b3-0b0a-4b1a-9b0a-9b0a9b0a9b0a'),
                name: 'John Doe',
            });

            aggregate.updateName('Jane Doe');

            // Act
            aggregate.dispatchEvents(eventBus);

            // Assert
            expect(logger.messages).toHaveLength(0);
        });
    });
});
