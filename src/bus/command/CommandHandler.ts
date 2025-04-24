import type { Command } from '@/bus/command/Command';

export abstract class CommandHandler<TCommand extends Command, TResponse = void> {
    public abstract readonly __TAG: string;

    public abstract handle(command: TCommand): Promise<TResponse>;
}
