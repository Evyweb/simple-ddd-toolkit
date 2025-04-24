import type { ICommandHandler } from '@/bus/command/ICommandHandler';
import type { FakeLogger } from '../../logger/FakeLogger';
import type { FakeUpdateNameCommand } from './FakeUpdateNameCommand';

export class FakeUpdateNameWithReturnedValueCommandHandler
    implements ICommandHandler<FakeUpdateNameCommand, string>
{
    readonly __TAG = 'FakeUpdateNameWithReturnedValueCommandHandler';

    constructor(private readonly logger: FakeLogger) {}

    async handle(command: FakeUpdateNameCommand): Promise<string> {
        this.logger.log(command.name);
        return Promise.resolve(command.name);
    }
}
