import {FakeRequest} from "./FakeRequest";
import {FakePresenterPort} from "./FakePresenterPort";
import {IUseCase} from "@/useCase/IUseCase";

export class FakeUseCase implements IUseCase<FakeRequest> {
    constructor(private readonly presenter: FakePresenterPort) {
    }

    async execute(request: FakeRequest): Promise<void> {
        this.presenter.presentName(request.name);
    }
}
