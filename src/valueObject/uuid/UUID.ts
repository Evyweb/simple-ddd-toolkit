import {randomUUID} from 'node:crypto';
import {ValueObject} from "../ValueObject";
import {UUIDData} from "./UUIDData";

export class UUID extends ValueObject<UUIDData> {
    public static readonly UUID_PATTERN = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

    static create(): UUID {
        // Validation rules here
        return new UUID({
            value: randomUUID(),
            isNew: true,
        });
    }

    static createFrom(value: string): UUID {
        // Validation rules here
        return new UUID({
            value,
            isNew: false,
        });
    }

    equals(other: ValueObject<UUIDData>): boolean {
        return this.get('value') === other.get('value');
    }

    static isValid(uuid: string): boolean {
        return uuid.match(UUID.UUID_PATTERN) !== null;
    }

    isValid(): boolean {
        return UUID.isValid(this.get('value'));
    }

    isNew(): boolean {
        return this.get('isNew');
    }
}
