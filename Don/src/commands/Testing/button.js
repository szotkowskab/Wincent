const { SlashCommandBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ButtonInteraction, ComponentType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('click button'),
    async execute(interaction, client) {
        var k = 1;
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button')
                    .setEmoji('🛎')
                    .setLabel(' click me!')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('button2')
                    .setEmoji('🛎')
                    .setLabel(' click me 2!')
                    .setStyle(ButtonStyle.Secondary),
            );

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('here\'s the button')
            .setDescription(k.toString())


            const MSG = await interaction.reply({ embeds: [embed], components: [buttons] }).catch(err => { return })

        const collector = await MSG.createMessageComponentCollector({ componentType: ComponentType.Button, max: 2});
        
        
        collector.once('collect', async Button => {

            if (Button.customId === 'button') {
                const newEmbed = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('this is a new embed')
                    .setDescription(k.toString())
                k++
                await Button.update({ embeds: [newEmbed], components: [buttons] })
            }
            if (Button.customId === 'button2') {
                await interaction.followUp('U clicked the useless button! and it worked! congrats!');
            }
        }
        )
        collector.once('end', async Button =>{ console.log("collector ended")})
    }
}


