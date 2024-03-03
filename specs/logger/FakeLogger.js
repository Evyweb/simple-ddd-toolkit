export class FakeLogger {
    constructor() {
        this.messages = [];
    }
    log(message) {
        this.messages.push(message);
    }
}
//# sourceMappingURL=FakeLogger.js.map