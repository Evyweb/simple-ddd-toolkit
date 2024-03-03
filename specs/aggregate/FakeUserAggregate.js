import { Aggregate } from "../../src";
import { UpdateUsernameEvent } from "./UpdateUsernameEvent";
export class FakeUserAggregate extends Aggregate {
    static create(fakeUserData) {
        return new FakeUserAggregate(fakeUserData);
    }
    updateName(newName) {
        this.set('name', newName);
        this.addEvent(new UpdateUsernameEvent(this.id(), newName));
    }
}
//# sourceMappingURL=FakeUserAggregate.js.map