import { FakeUserData } from './FakeUserData';
import {Entity} from "../../src";

export class FakeUserEntity extends Entity<FakeUserData> {
  static create(fakeUserData: FakeUserData): FakeUserEntity {
    // Validation rules here
    return new FakeUserEntity(fakeUserData);
  }
}
