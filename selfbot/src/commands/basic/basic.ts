import { Command } from "../../types/command.ts";
import { Message } from "discord.js-selfbot-v13";

const basicCommands: Command[] = [
    {
        name: "ping",
        execute: (message: Message) => {
            message.reply("Pong!");
        }
    }
]

export default basicCommands;