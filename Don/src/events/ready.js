const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence({ activities: [{ name: "I'm not a dog!", type: ActivityType.Competing }], status: 'idle' });
        
        console.log('Ready!');

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};