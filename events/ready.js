const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.user.setActivity(`@${client.user.username}`, { type: "COMPETING" })
}