const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
var { material: creatures } = require("../../material");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search by ID')
        .addIntegerOption(option => option
            .setName("id")
            .setDescription('The ID of searched item')
            .setMinValue(0)
            .setMaxValue(creatures.length-1)
            .setRequired(true)),

    async execute(interaction, client) {
        if(global.gameRunning) {
        await interaction.reply({content: "You can't run this command while game is running <:YXsillyCat:1050829106675200151>"})
        return
        }
        const ID = interaction.options.getInteger('id');
        const searchItemEmbed = new EmbedBuilder()
            .setTitle("ID: " + ID.toString())
            .addFields(
                {name: "Is dog", value: creatures[ID].isDog.toString()},
                {name: "Source", value: creatures[ID].sourceUrl},
                {name: "Extra info", value: creatures[ID].text.toString()}
            )
            .setColor('DarkNavy')
            .setImage(creatures[ID].imageUrl)

        await interaction.reply({ embeds: [searchItemEmbed] })
        
    }
}
