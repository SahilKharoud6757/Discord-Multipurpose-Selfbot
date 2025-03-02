import { Message } from "discord.js-selfbot-v13";

export interface Command {
  name: string;
  execute: (message: Message, args: string[]) => void;
}