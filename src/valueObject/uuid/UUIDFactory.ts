import { UUID } from './UUID';

export function Uuid(): UUID {
  return UUID.create();
}

export function UuidFrom(value: string): UUID {
  return UUID.createFrom(value);
}
