import { Entity } from "../../src/entity/Entity";
export class FakeUserEntity extends Entity {
    static create(fakeUserData) {
        // Validation rules here
        return new FakeUserEntity(fakeUserData);
    }
}
//# sourceMappingURL=FakeUserEntity.js.map