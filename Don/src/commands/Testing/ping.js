const { SlashCommandBuilder } = require( '@discordjs/builders' )
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
    async execute(interaction, client) {

        await interaction.reply({content: '<:yx_pingpong:842764824508891196>'})
    }
}