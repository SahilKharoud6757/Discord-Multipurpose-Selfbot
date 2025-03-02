import { readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Message } from "discord.js-selfbot-v13";
import { Command } from "./src/types/command.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class CommandHandler {
  private commands: Map<string, Command> = new Map();

  constructor() {
    this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const commandCategories = readdirSync(resolve(__dirname, "src", "commands"));

    for (const category of commandCategories) {
      const categoryPath = resolve(__dirname, "src", "commands", category);
      const commandFiles = readdirSync(categoryPath).filter(file => file.endsWith(".ts"));

      for (const file of commandFiles) {
        const { default: commands } = await import(`./src/commands/${category}/${file}`);

        if (Array.isArray(commands)) {
          for (const command of commands as Command[]) {
            this.commands.set(command.name, command);
          }
        } else {
          const command = commands as Command;
          this.commands.set(command.name, command);
        }
      }
    }

    console.log(`Loaded ${this.commands.size} commands.`);
  }

  public handle(message: Message): void {
    const args = message.content.split(" ");
    const commandName = args.shift()?.toLowerCase() || "";

    if (this.commands.has(commandName)) {
      this.commands.get(commandName)?.execute(message, args);
    }
  }
}