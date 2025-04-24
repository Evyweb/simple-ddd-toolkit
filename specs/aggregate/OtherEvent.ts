import { DomainEvent } from '@/domainEvent/DomainEvent';

export class OtherEvent extends DomainEvent {
    readonly __TAG: string = 'OtherEvent';
}
