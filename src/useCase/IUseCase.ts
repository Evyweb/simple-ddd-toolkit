export interface IUseCase<Request> {
    execute(request?: Request): Promise<void>;
}
