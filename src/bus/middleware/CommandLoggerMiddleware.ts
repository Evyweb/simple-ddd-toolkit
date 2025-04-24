import type { Command } from '@/bus/command/Command';
import type { Logger } from '@/logger/Logger';
import type { Middleware } from './Middleware';

export class CommandLoggerMiddleware implements Middleware<Command> {
    constructor(
        private readonly logger: Logger,
        private readonly middlewareId: string
    ) {}

    async execute<T>(
        command: Command,
        next: (command: Command) => Promise<T>
    ): Promise<T> {
        const date = new Date().toISOString();
        this.logger.log(
            `[${date}][${this.middlewareId}][${command.__TAG}] - ${JSON.stringify(command)}`
        );
        return next(command);
    }
}
