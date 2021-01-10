const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    execute: async function(client, message, args) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("❌ You need to have **MANAGE_GUILD** permissions in order to use this command.")
        const get = () => {
            const map = client.db.get(message.guild.id)
            if(!map) return "❌ No panels created."
            else return map.map(panel => `**[${panel.name}](https://discord.com/channels/${message.guild.id}/${panel.channel}/${panel.message})** (**${panel.keys.length}** keys)`).join("\n")
        }
        message.channel.send(new MessageEmbed()
            .setAuthor(`List of all FAQ panels`, client.user.displayAvatarURL({ dynamic: true }), client.config.link)
            .setColor("#508939")
            .setDescription(get())
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        );
    }
};
