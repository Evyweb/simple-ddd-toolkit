import {ValueObject} from "@/valueObject/ValueObject";

export class OtherValueObject extends ValueObject<null> {
    public static create(): OtherValueObject {
        return new OtherValueObject(null);
    }
}