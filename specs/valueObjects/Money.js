import { ValueObject } from "../../src";
export class Money extends ValueObject {
    static create(moneyData) {
        // Validation rules here
        return new Money(moneyData);
    }
}
//# sourceMappingURL=Money.js.map