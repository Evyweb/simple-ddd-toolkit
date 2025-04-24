import { CommandHandler } from '@/bus/command/CommandHandler';
import type { FakeLogger } from '../../logger/FakeLogger';
import type { FakeUpdateNameCommand } from './FakeUpdateNameCommand';

export class FakeUpdateNameCommandHandler extends CommandHandler<FakeUpdateNameCommand> {
    readonly __TAG: string = 'FakeUpdateNameCommandHandler';

    constructor(private readonly logger: FakeLogger) {
        super();
    }

    async handle(command: FakeUpdateNameCommand): Promise<void> {
        this.logger.log(command.name);
    }
}
