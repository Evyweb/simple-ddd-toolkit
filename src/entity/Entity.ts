import { UUID } from '@/valueObject/uuid/UUID';

export abstract class Entity<EntityData extends { id: UUID }> {
  private readonly data: EntityData;

  protected constructor(entityData: EntityData) {
    this.data = entityData;
  }

  id(): string {
    return this.data.id.get('value');
  }

  get<Key extends keyof EntityData>(key: Key): EntityData[Key] {
    return this.data[key];
  }

  set<Key extends keyof EntityData>(key: Key, value: EntityData[Key]): void {
    this.data[key] = value;
  }

  equals(other: Entity<EntityData>): boolean {
    return this.data.id.get('value') === other.data.id.get('value');
  }

  isNew(): boolean {
    return this.get('id').isNew();
  }

  toObject(): Readonly<EntityData> {
    return Object.freeze(this.data);
  }
}
