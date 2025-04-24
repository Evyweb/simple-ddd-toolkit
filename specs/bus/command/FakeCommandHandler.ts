import { CommandHandler } from '@/bus/command/CommandHandler';
import type { Logger } from '@/logger/Logger';
import type { FakeCommand } from './FakeCommand';

export class FakeCommandHandler extends CommandHandler<FakeCommand> {
    public readonly __TAG = 'FakeCommandHandler';

    constructor(private readonly logger: Logger) {
        super();
    }

    async handle(command: FakeCommand): Promise<void> {
        this.logger.log(command.name);
    }
}
