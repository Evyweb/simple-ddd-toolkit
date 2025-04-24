import { UUID } from './UUID';

export function Uuid(value: string, isNew = true): UUID {
    return UUID.create(value, isNew);
}

export function UuidFrom(value: string): UUID {
    return UUID.createFrom(value);
}
