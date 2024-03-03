import { ValueObject } from "../../src";
export class SomeInformation extends ValueObject {
    static create(data) {
        // Validation rules here
        return new SomeInformation(data);
    }
}
//# sourceMappingURL=SomeInformation.js.map