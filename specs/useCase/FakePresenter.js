export class FakePresenter {
    constructor() {
        this.viewModel = { newName: '' };
    }
    presentName(name) {
        this.viewModel.newName = name.toUpperCase();
    }
}
//# sourceMappingURL=FakePresenter.js.map