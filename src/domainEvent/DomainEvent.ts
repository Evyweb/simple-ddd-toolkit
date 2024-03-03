export interface DomainEvent {
  eventId: string;
  eventType: string;
  occurredOn: Date;
  metadata?: Record<string, any>;
}
