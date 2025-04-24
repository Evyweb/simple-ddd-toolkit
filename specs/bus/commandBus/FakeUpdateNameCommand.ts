import { Command } from '@/bus/command/Command';

export class FakeUpdateNameCommand extends Command {
    readonly __TAG: string = 'FakeUpdateNameCommand';

    constructor(public readonly name: string) {
        super();
    }
}
