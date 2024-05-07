import {Command} from "@/command/Command";

export interface CommandMiddleware {
    execute(command: Command, next: (command: Command) => Promise<void>): Promise<void>;
}
