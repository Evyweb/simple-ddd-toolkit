import { randomUUID } from 'node:crypto';
import { ValueObject } from "../ValueObject";
export class UUID extends ValueObject {
    static create() {
        // Validation rules here
        return new UUID({
            value: randomUUID(),
            isNew: true,
        });
    }
    static createFrom(value) {
        // Validation rules here
        return new UUID({
            value,
            isNew: false,
        });
    }
    equals(other) {
        return this.get('value') === other.get('value');
    }
    static isValid(uuid) {
        return uuid.match(UUID.UUID_PATTERN) !== null;
    }
    isValid() {
        return UUID.isValid(this.get('value'));
    }
    isNew() {
        return this.get('isNew');
    }
}
UUID.UUID_PATTERN = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;
//# sourceMappingURL=UUID.js.map