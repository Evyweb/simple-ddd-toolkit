import {Message} from "@/bus/Message";

export abstract class Command implements Message {
    public readonly __TAG: string = this.constructor.name;
}