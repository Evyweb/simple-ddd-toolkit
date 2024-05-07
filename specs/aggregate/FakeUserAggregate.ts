import {FakeUserAggregateData} from "./FakeUserAggregateData";
import {FakeUserData} from "../entity/FakeUserData";
import {UpdateUsernameEvent} from "./UpdateUsernameEvent";
import {Aggregate} from "@/aggregate/Aggregate";

export class FakeUserAggregate extends Aggregate<FakeUserAggregateData> {
  static create(fakeUserData: FakeUserData): FakeUserAggregate {
    return new FakeUserAggregate(fakeUserData);
  }

  updateName(newName: string): void {
    this.set('name', newName);
    this.addEvent(new UpdateUsernameEvent(this.id(), newName));
  }
}
