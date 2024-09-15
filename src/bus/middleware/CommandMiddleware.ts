import {Command} from "@/bus/command/Command";

export interface CommandMiddleware {
    execute<Response>(command: Command, next: (command: Command) => Promise<Response>): Promise<Response>;
}
