import { CommandHandler } from '@/bus/command/CommandHandler';
import type { Logger } from '@/logger/Logger';
import type { FakeCommand } from './FakeCommand';

export class FakeCommandHandlerWithReturnedValue extends CommandHandler<FakeCommand, boolean> {
    public readonly __TAG = 'FakeCommandHandlerWithReturnedValue';

    constructor(private readonly logger: Logger) {
        super();
    }

    async handle(command: FakeCommand): Promise<boolean> {
        this.logger.log(command.name);
        return Promise.resolve(true);
    }
}
