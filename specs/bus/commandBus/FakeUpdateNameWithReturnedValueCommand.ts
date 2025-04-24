import { Command } from '@/bus/command/Command';

export class FakeUpdateNameWithReturnedValueCommand extends Command {
    readonly __TAG: string = 'FakeUpdateNameWithReturnedValueCommand';

    constructor(public readonly name: string) {
        super();
    }
}
