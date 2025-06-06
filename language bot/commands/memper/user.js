// الامر هاذا من صنع عيسى

const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { t } = require('../../utils/lang'); 

function getLanguage(guildId) {
    const data = JSON.parse(fs.readFileSync('JSON/language.json'));
    return data[guildId] || 'en';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Shows user information / يعرض معلومات المستخدم')
        .addUserOption(option =>
            option.setName('user').setDescription('User to get their info / المستخدم الذي تريد معلوماته')
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const lang = getLanguage(interaction.guild.id);
        const mentionedMember = interaction.options.getMember('user') || interaction.member;

        const embed = new EmbedBuilder()
            .setAuthor({
                name: t(lang, 'USER_INFO_TITLE', { tag: mentionedMember.user.tag }),
                iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' })
            })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024, format: 'png' }))
            .addFields(
                {
                    name: t(lang, 'JOINED_DISCORD'),
                    value: `**<t:${Math.floor(mentionedMember.user.createdTimestamp / 1000)}:R>**`,
                    inline: true
                },
                {
                    name: t(lang, 'JOINED_SERVER'),
                    value: `**<t:${Math.floor(mentionedMember.joinedAt / 1000)}:R>**`,
                    inline: true
                }
            );

        await interaction.reply({ embeds: [embed] });
    }
};
