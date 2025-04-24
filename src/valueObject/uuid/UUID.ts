import { ValueObject } from '../ValueObject';
import type { UUIDData } from './UUIDData';

export class UUID extends ValueObject<UUIDData> {
    public static readonly UUID_PATTERN = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

    static create(value: string, isNew = true): UUID {
        if (!UUID.isValid(value)) {
            throw new Error('Invalid UUID');
        }

        return new UUID({
            value,
            isNew,
        });
    }

    static createFrom(value: string): UUID {
        return UUID.create(value, false);
    }

    equals(other: ValueObject<UUIDData>): boolean {
        return this.get('value') === other.get('value');
    }

    static isValid(uuid: string): boolean {
        return uuid.match(UUID.UUID_PATTERN) !== null;
    }

    isNew(): boolean {
        return this.get('isNew');
    }
}
