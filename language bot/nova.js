// خليتها بدون تشفير هنا عشان الي يبي يسوي زيها وشكرا
const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'nova',
    description: 'Shows Nova guns.lol',
    options: [],

    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const targetUserId = '1194456715614240799'; 

        try {
            const user = await client.users.fetch(targetUserId);
            const fullUser = await user.fetch(); 

            const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });
            const bannerUrl = fullUser.bannerURL({ dynamic: true, size: 4096 });

            const embed = new EmbedBuilder()
                .setTitle('Nova | guns.lol')
                .setDescription('Nova pf')
                .setURL('https://guns.lol/9.se')
                .setColor(0x2f3136)
                .setThumbnail(avatarUrl);

            if (bannerUrl) {
                embed.setImage(bannerUrl);
            } else {
                embed.setDescription('Nova pf\n*(لا يوجد بنر لهذا المستخدم)*');
            }

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ حدث خطأ أثناء جلب معلومات المستخدم.', ephemeral: true });
        }
    },
};
