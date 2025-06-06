const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const { t } = require('../../utils/lang');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-language')
    .setDescription('تغيير لغة البوت / Change bot language')
    .addStringOption(option =>
      option
        .setName('lang')
        .setDescription('اختر اللغة / Choose a language')
        .addChoices(
          { name: 'العربية', value: 'ar' },
          { name: 'English', value: 'en' }
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const lang = interaction.options.getString('lang');
    const guildId = interaction.guild.id;

    const data = JSON.parse(fs.readFileSync('JSON/language.json'));
    data[guildId] = lang;
    fs.writeFileSync('JSON/language.json', JSON.stringify(data, null, 2));

    interaction.reply({ content: t(lang, 'LANGUAGE_SET'), ephemeral: true });
  },
};
