const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const fs = require('fs');
const { t } = require('../../utils/lang');

function getLanguage(guildId) {
    const data = JSON.parse(fs.readFileSync('JSON/language.json'));
    return data[guildId] || 'en';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bug-report')
        .setDescription('Send a bug report to the staff team / إرسال بلاغ عن خطأ لفريق الإدارة')
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Describe the bug / صف الخطأ')
                .setRequired(true)
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const bugDescription = interaction.options.getString('description');
        const lang = getLanguage(interaction.guild.id);
        const bugChannel = client.channels.cache.get('1379533501250015344'); // هنا الروم الي تبي البوت يرسل البلاغ فيها

        if (!bugChannel) {
            return interaction.reply({ content: t(lang, 'BUG_CHANNEL_NOT_FOUND'), ephemeral: true });
        }

        await bugChannel.send({
            embeds: [{
                title: '🐞 ' + t(lang, 'BUG_REPORT_TITLE'),
                description: `**${t(lang, 'FROM')}:** <@${interaction.user.id}>\n\n**${t(lang, 'DESCRIPTION')}:** ${bugDescription}`,
                color: 0xff0000,
                timestamp: new Date()
            }]
        });

        await interaction.reply({ content: '✅ ' + t(lang, 'BUG_REPORTED_SUCCESS'), ephemeral: true });
    },
};
