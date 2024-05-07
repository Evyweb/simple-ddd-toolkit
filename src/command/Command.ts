export abstract class Command {
    public readonly __TAG: string = this.constructor.name;
}