import { Entity } from '@/entity/Entity';
import type { FakeUserData } from './FakeUserData';

export class FakeUserEntity extends Entity<FakeUserData> {
    static create(fakeUserData: FakeUserData): FakeUserEntity {
        // Validation rules here
        return new FakeUserEntity(fakeUserData);
    }
}
