export class InstanceLoader {
    public static getInstance<T>(context: Object, name: string, ...args: any[]): T {
        const instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return  instance as T;
    }
}