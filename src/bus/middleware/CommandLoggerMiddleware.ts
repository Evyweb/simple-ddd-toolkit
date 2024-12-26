import {Middleware} from "./Middleware";
import {Logger} from "@/logger/Logger";
import {Command} from "@/bus/command/Command";

export class CommandLoggerMiddleware implements Middleware<Command> {
    constructor(
        private readonly logger: Logger,
        private readonly middlewareId: string
    ) {
    }

    async execute<T>(command: Command, next: (command: Command) => Promise<T>): Promise<T> {
        const date = new Date().toISOString();
        this.logger.log(`[${date}][${this.middlewareId}][${command.__TAG}] - ${JSON.stringify(command)}`);
        return next(command);
    }
}