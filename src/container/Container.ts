type AnyFunction = () => any;

export class Container {
    private bindings = new Map<string, AnyFunction>();
    private instances = new Map<string, any>();

    public bind<T extends AnyFunction>(name: string, factory: T): void {
        this.bindings.set(name, factory as AnyFunction);
        this.instances.delete(name);
    }

    public get<T>(name: string): T {
        if (!this.bindings.has(name)) {
            throw new Error(`No binding found for ${name}`);
        }
        if (!this.instances.has(name)) {
            this.instances.set(name, (this.bindings.get(name) as AnyFunction)());
        }
        return this.instances.get(name) as T;
    }
}