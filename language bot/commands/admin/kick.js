const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const { t } = require('../../utils/lang');

function getLanguage(guildId) {
  const data = JSON.parse(fs.readFileSync('JSON/language.json'));
  return data[guildId] || 'en';
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('طرد عضو من السيرفر / Kick a member')
    .addUserOption(option =>
      option.setName('user').setDescription('العضو / Member').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason').setDescription('السبب / Reason').setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const lang = getLanguage(interaction.guild.id);
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'بدون سبب';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member)
      return interaction.reply({ content: t(lang, 'MEMBER_NOT_FOUND'), ephemeral: true });

    if (!member.kickable)
      return interaction.reply({ content: t(lang, 'MEMBER_NOT_KICKABLE'), ephemeral: true });

    await member.kick(reason);
    interaction.reply(t(lang, 'MEMBER_KICKED', { user: user.tag, reason }));
  },
};
