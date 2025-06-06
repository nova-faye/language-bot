const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const fs = require('fs');
const { t } = require('../../utils/lang'); 

function getLanguage(guildId) {
    const data = JSON.parse(fs.readFileSync('JSON/language.json'));
    return data[guildId] || 'en';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! / يرد بـ Pong!'),
    
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const lang = getLanguage(interaction.guild.id);
        await interaction.reply(t(lang, 'PING_REPLY'));
    },
};
