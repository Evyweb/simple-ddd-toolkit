export class Entity {
    constructor(entityData) {
        this.data = entityData;
    }
    id() {
        return this.data.id.get('value');
    }
    get(key) {
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
    }
    equals(other) {
        return this.data.id.get('value') === other.data.id.get('value');
    }
    isNew() {
        return this.get('id').isNew();
    }
    toObject() {
        return Object.freeze(this.data);
    }
}
//# sourceMappingURL=Entity.js.map