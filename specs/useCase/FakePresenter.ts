import type { FakePresenterPort } from './FakePresenterPort';
import type { FakeViewModel } from './FakeViewModel';

export class FakePresenter implements FakePresenterPort {
    viewModel: FakeViewModel = { newName: '' };

    presentName(name: string): void {
        this.viewModel.newName = name.toUpperCase();
    }
}
