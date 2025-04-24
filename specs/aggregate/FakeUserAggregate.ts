import { Aggregate } from '@/aggregate/Aggregate';
import type { FakeUserData } from '../entity/FakeUserData';
import type { FakeUserAggregateData } from './FakeUserAggregateData';

export class FakeUserAggregate extends Aggregate<FakeUserAggregateData> {
    static create(fakeUserData: FakeUserData): FakeUserAggregate {
        return new FakeUserAggregate(fakeUserData);
    }

    updateName(newName: string): void {
        this.set('name', newName);
    }
}
