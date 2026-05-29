const { SlashCommandBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ButtonInteraction, ComponentType } = require('discord.js')

var { material: creatures } = require("../../material");
let usedCreatures = [];
global.gameRunning = false

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multiple')
        .setDescription('Play many rounds of Dog or Not game')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of rounds to play').setMinValue(1).setMaxValue(40).setRequired(true)),
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('amount');
        if (creatures.length == 0) {
            creatures = usedCreatures
            usedCreatures = []

        }
        let randomNum
        let roundsPlayed = 0
        let score = 0
        
        

        let startingEmbed = new EmbedBuilder()
            .setTitle("Dog or Not?")
            .setDescription("Click the button bellow to start the game")

        let startButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('START')
                    .setEmoji('<:YXtick:1050077242820132934>')
                    .setLabel('Start the game!')
                    .setStyle(ButtonStyle.Primary),
            )

        let row = new ActionRowBuilder()
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
            )

        const MSG = await interaction.reply({ embeds: [startingEmbed], components: [startButton] })

        const gameCollector = await MSG.createMessageComponentCollector({ max: amount + 1, time: 5000*amount });



        gameCollector.on("collect", async j => {
            global.gameRunning = true
            if(j.user.id != interaction.user.id){ 
                return await j.reply({content: "This is not your game", ephemeral: true})
            }
            roundsPlayed++
            // -----------------------------------------------------------------------------
            //--------------------------- kontrola spravnosti ------------------------------
            // -----------------------------------------------------------------------------
            //dobre
            if (j.customId === 'DOG' && creatures[randomNum].isDog) { score++ }
            else if (j.customId === 'NOT' && !creatures[randomNum].isDog) { score++ }
            //spatne
            else if (j.customId === 'DOG' && !creatures[randomNum].isDog) { }
            else if (j.customId === 'NOT' && creatures[randomNum].isDog) { }

            // -----------------------------------------------------------------------------
            //------------------------------- novy embed -----------------------------------
            // -----------------------------------------------------------------------------
            if (j.customId == 'START') { started = true}
            if (j.customId != 'START') {
                usedCreatures.push(creatures[randomNum])
                creatures.splice(randomNum, 1)
            }


            // dalsi kolo:
            if (roundsPlayed <= amount) {

                if (creatures.length == 0) {
                    creatures = usedCreatures
                    usedCreatures = []
                }
                randomNum = Math.floor(Math.random() * creatures.length)

                await j.update({
                    embeds: [new EmbedBuilder()
                        .setTitle("Dog or Not?")
                        .setDescription("Round: " + roundsPlayed +"\n"+score.toString() + " / " + amount.toString())
                        .setImage(creatures[randomNum].imageUrl)
                        .setColor("DarkNavy")
                        .setFooter({ text: "ID: "+creatures[randomNum].ID.toString()})
                    ],
                        
                    components: [row]
                })

            }// konec:
            else {
                await j.update({
                    embeds: [new EmbedBuilder()
                        .setTitle("End")
                        .setDescription("Score: " + score.toString() + " / " + amount.toString())],
                    components: []

                })
                gameCollector.stop()
            }
        })
        gameCollector.on("end", async i => {global.gameRunning = false})
    },

}
