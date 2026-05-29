const { SlashCommandBuilder } = require( '@discordjs/builders' )
const { EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('readme')
    .setDescription('info about the game'),
    async execute(interaction, client) {

        let readMeEmbed = new EmbedBuilder()
        .setColor('DarkNavy')
        .setTitle("__Info__")
        .addFields(
            {name: 'Origins', value: 'The concept of this games comes from [this](https://www.reddit.com/r/HFY/comments/7hl3u3/dog_or_not_part_1/) fiction written by u/horizonsong'},
            {name: 'Game modes', value: "There are 2 game modes: \n • **/single** - play only one round of this game and see if your answer is correct or not, source and sometimes extra info (for dogs usually breed, for not-dogs their species)\n • **/multiple [amount]** - play multiple games of the game; you won't be able to view the source or the corectness of your answer, only the score\n "},
            {name: 'How to play', value: 'After running the game command, you will see a picture; your task is to guess, wether there is a dog on the picture, or not. Dogs are consistered canines recognised by [FCI](https://www.fci.be/en/) both on definitive and provisional basis \n → this means that for example a *wolf dog* or a *bush dog* are consistered not-dogs, despite their name'}
            )
        await interaction.reply({embeds: [readMeEmbed]})
    }
}
