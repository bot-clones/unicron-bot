const Discord = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');

module.exports = class extends BaseEvent {
    constructor() {
        super('guildDelete');
    }
    /**
     * @param {Client} client
     * @param {Discord.Guild} guild
     */
    async run(client, guild) {
        const channel = await client.channels.fetch(client.unicron.channel);
        try {
            const g = await client.database.guilds.fetch(guild.id);
            await g.destroy(true, true);
        } catch (err) {
            console.log(err);
        }
        client.user.setPresence({
            activity: {
                name: `${client.guilds.cache.size} guilds! | ?help`,
                type: 'LISTENING',
            },
            status: 'online',
        });
        channel.send(`Unicron left \`${guild.name}\``);
    }
}