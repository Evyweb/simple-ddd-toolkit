import {Command} from "@/command/Command";

export interface CommandMiddleware {
    execute<Response>(command: Command, next: (command: Command) => Promise<Response>): Promise<Response>;
}
