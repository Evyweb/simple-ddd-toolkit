import type { IUseCase } from '@/useCase/IUseCase';
import type { FakePresenterPort } from './FakePresenterPort';
import type { FakeRequest } from './FakeRequest';

export class FakeUseCase implements IUseCase<FakeRequest> {
    constructor(private readonly presenter: FakePresenterPort) {}

    async execute(request: FakeRequest): Promise<void> {
        this.presenter.presentName(request.name);
    }
}
