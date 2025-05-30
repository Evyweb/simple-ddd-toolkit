import { Entity } from '@/entity/Entity';
import type { FakeUserData } from './FakeUserData';

export class FakeUserEntity extends Entity<FakeUserData> {
    static create(fakeUserData: FakeUserData): FakeUserEntity {
        // Validation rules here
        return new FakeUserEntity(fakeUserData);
    }

    // For testing purpose only
    set(key: keyof FakeUserData, value: FakeUserData[typeof key]): void {
        super.set(key, value);
    }
}
