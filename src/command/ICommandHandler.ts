export interface ICommandHandler<Command> {
  handle(command?: Command): Promise<void>;
}
