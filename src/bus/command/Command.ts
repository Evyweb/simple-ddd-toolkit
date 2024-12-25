import {Message} from "@/bus/Message";

export abstract class Command implements Message {
    public abstract readonly __TAG: string;
}