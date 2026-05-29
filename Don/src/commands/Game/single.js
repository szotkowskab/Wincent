var { material: material } = require("../../material");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ButtonInteraction, ComponentType } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

let usedCreatures = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('single')
        .setDescription('Play a single round of Dog or Not game'),
    async execute(interaction, client) {
        if (material.length == 0) {
            material = usedCreatures
            usedCreatures = []

        }
        let randomNum = Math.floor(Math.random() * material.length)




        const embed = new EmbedBuilder()
            .setColor("DarkNavy")
            .setTitle("Dog or Not?")
            .setImage(material[randomNum].imageUrl)

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('DOG')
                    .setEmoji('<:YXtick:1050077242820132934>')
                    .setLabel('Dog')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('NOT')
                    .setEmoji('<:YXcross:1050077330732752946>')
                    .setLabel('Not')
                    .setStyle(ButtonStyle.Secondary),
            );

        const MSG = await interaction.reply({ embeds: [embed], components: [buttons] })


        const collector = await MSG.createMessageComponentCollector({ componentType: ComponentType.Button, max: 1, time: 10000 });

        let answer = ""
        let wasDog = ""
        let color = ""
        global.gameRunning = true
        collector.on("collect", async Button => {
            
            if (Button.customId === 'DOG' && material[randomNum].isDog) { answer = "**Correct!**"; color = "Green" }
            else if (Button.customId === 'NOT' && !material[randomNum].isDog) { answer = "**Correct!**"; color = "Green" }
            else { answer = "**Wrong!**"; color = "Red" }
            if (material[randomNum].isDog) {
                wasDog = "That was a dog"
            } else { wasDog = "That wasn't a dog" }

            const embedGameEnd = new EmbedBuilder()
                .setColor(color)
                .setTitle('Dog or Not?')
                .setDescription(answer + "\n" + wasDog + material[randomNum].text + "\n" + "[sᴏᴜʀᴄᴇ](" + material[randomNum].sourceUrl + ")")

            await Button.update({ embeds: [embedGameEnd], components: [] })


            usedCreatures.push(material[randomNum])
            material.splice(randomNum, 1)
        })
        collector.on('end', async i => {global.gameRunning = false})

    }
}