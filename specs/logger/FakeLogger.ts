import { Logger } from '../../src/logger/Logger';

export class FakeLogger implements Logger {
  public readonly messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }
}
