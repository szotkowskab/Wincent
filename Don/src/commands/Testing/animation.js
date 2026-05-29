const { SlashCommandBuilder } = require( '@discordjs/builders' )
module.exports = {
    data: new SlashCommandBuilder()
    .setName('animation')
    .setDescription('᲼᲼'),
    async execute(interaction, client) {
        await interaction.reply({content: '᲼  o \n᲼/ | \\ \n᲼ /\\'})
        for(let i = 0; i < 5; i++ ){
        await new Promise(r => setTimeout(r, 300));
        await interaction.editReply('᲼\\o/ \n᲼   | \n᲼ /\\');
        await new Promise(r => setTimeout(r, 300));
        await interaction.editReply('᲼  o \n᲼/ | \\ \n᲼ /\\');
    }
    await new Promise(r => setTimeout(r, 500));

        await interaction.deleteReply();
    }
}