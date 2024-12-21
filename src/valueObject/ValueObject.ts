export abstract class ValueObject<ValueObjectData> {
    private readonly data: ValueObjectData;

    protected constructor(data: ValueObjectData) {
        this.data = this.deepFreeze(data);
    }

    equals(other: ValueObject<ValueObjectData>): boolean {
        if (!other) {
            return false;
        }

        return this.reflectiveEqual(this.data, other.data);
    }

    get<T extends keyof ValueObjectData>(key: T): ValueObjectData[T] {
        return this.data[key];
    }

    private reflectiveEqual(obj1: unknown, obj2: unknown): boolean {
        if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
            return obj1 === obj2;
        }

        const obj1Keys = Reflect.ownKeys(obj1);
        const obj2Keys = Reflect.ownKeys(obj2);

        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        return obj1Keys.every((key) => {
            const val1 = Reflect.get(obj1, key);
            const val2 = Reflect.get(obj2, key);

            if (typeof val1 === "object" && val1 !== null && typeof val2 === "object" && val2 !== null) {
                return this.reflectiveEqual(val1, val2);
            }

            return val1 === val2;
        });
    }

    private deepFreeze<T>(object: T): T {
        if (typeof object !== "object" || object === null) {
            return object;
        }

        const propNames = Object.getOwnPropertyNames(object) as (keyof T)[];

        propNames.forEach((name) => {
            const property = object[name];
            if (property && typeof property === "object" && !Object.isFrozen(property)) {
                this.deepFreeze(property);
            }
        });

        return Object.freeze(object);
    }
}
