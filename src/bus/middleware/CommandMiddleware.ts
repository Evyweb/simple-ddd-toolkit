import {Command} from "@/bus/command/Command";

export interface CommandMiddleware {
    readonly __TAG: string;

    execute<Response>(command: Command, next: (command: Command) => Promise<Response>): Promise<Response>;
}
