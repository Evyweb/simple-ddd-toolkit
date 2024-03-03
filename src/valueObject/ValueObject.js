export class ValueObject {
    constructor(data) {
        this.data = Object.freeze(data);
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.reflectiveEqual(this.data, other.data);
    }
    get(key) {
        return this.data[key];
    }
    reflectiveEqual(obj1, obj2) {
        const obj1Keys = Reflect.ownKeys(obj1);
        const obj2Keys = Reflect.ownKeys(obj2);
        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }
        return obj1Keys.every((key) => {
            const val1 = Reflect.get(obj1, key);
            const val2 = Reflect.get(obj2, key);
            if (typeof val1 === 'object' && typeof val2 === 'object') {
                return this.reflectiveEqual(val1, val2);
            }
            return val1 === val2;
        });
    }
}
//# sourceMappingURL=ValueObject.js.map