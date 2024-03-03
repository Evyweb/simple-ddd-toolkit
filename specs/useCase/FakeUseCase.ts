import {IUseCase} from "../../src/useCase/IUseCase";
import {FakeRequest} from "./FakeRequest";
import {FakePresenterPort} from "./FakePresenterPort";

export class FakeUseCase implements IUseCase<FakeRequest> {
  constructor(private readonly presenter: FakePresenterPort) {}

  async execute(request: FakeRequest): Promise<void> {
    this.presenter.presentName(request.name);
  }
}
