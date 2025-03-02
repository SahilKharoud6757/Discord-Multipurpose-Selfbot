import { Client } from "discord.js-selfbot-v13";
import { CommandHandler } from "./commandhandler.js"
import "dotenv/config";

const client = new Client();
const commandHandler = new CommandHandler();

client.on("ready", () => {
    console.log(`Logged in to discord as ${client.user?.username || "unknown user."}!`);
});

client.on("messageCreate", async (message) => {
    if (message.author.id !== client.user?.id) return;

    commandHandler.handle(message);
});

client.login(process.env.DISCORD_TOKEN as string);