export class FakeQueryHandler {
    handle(query) {
        return Promise.resolve({ upperCaseName: query.name.toUpperCase() });
    }
}
//# sourceMappingURL=FakeQueryHandler.js.map