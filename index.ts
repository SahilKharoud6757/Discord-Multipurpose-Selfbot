import { Client } from 'discord.js-selfbot-v13';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in to discord as ${client.user?.username || "unknown user."}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'ping') {
        message.reply('Pong!');
    }
});

client.login(process.env.DISCORD_TOKEN as string);