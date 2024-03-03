import { Entity } from "../entity/Entity";
export class Aggregate extends Entity {
    constructor() {
        super(...arguments);
        this.domainEvents = [];
    }
    addEvent(domainEvent) {
        this.domainEvents.push(domainEvent);
    }
    clearEvents() {
        this.domainEvents = [];
    }
    dispatchEvents(bus) {
        this.domainEvents.forEach((event) => {
            bus.dispatch(event);
        });
        this.clearEvents();
    }
}
//# sourceMappingURL=Aggregate.js.map