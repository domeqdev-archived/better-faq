const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "publish",
    execute: async function(client, message, args) {
        const embed = new MessageEmbed().setColor("#508939");
        if(isNaN(Number(args[0]))) return message.channel.send("❌ Invalid panel ID.")
        let panel = client.db.ensure(message.guild.id, [])[Number(args[0])]
        if(!panel) return message.channel.send("❌ There is no panel with this ID.")
        if(panel.keys.length == 0) return message.channel.send(`❌ This panel doesn't has any Q&A. You add them using \`@${client.user.username} add ${args[0]} < question > && < answer >\`.`)
        if(!message.guild.channels.cache.get(panel.channel)) return message.channel.send("❌ This channel doesn't exist.") && client.db.reset(message.guild.id)
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_ROLES") || !message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ I need to have `MANAGE_CHANNELS`, `MANAGE_ROLES` and `MANAGE_MESSAGES` (preferred: `ADMINISTRATOR`) permissions to do that.")
        let msg = await message.guild.channels.cache.get(panel.channel).send(embed
            .setAuthor(panel.name, client.user.displayAvatarURL({ dynamic: true }))
            .setFooter("By reacting below you agree to be DMed with answer.")
            .setDescription(`${panel.keys.map((ee, i) => `${client.config.emojis[Number(i) + 1]}  ${ee.q}`).join("\n\n") + (panel.role ? "\n\n❓ **None of the above choices helped me**" : "")}`) 
        )
        panel.keys.forEach((lol, i) => {
            msg.react(client.config.emojis[Number(i) + 1])
        })
        panel.role ? msg.react("❓") : ""
        if(!msg) return message.channel.send(`❌ I can't post messages in <#${message.guild.channels.cache.get(panel.channel)}>!`)
        else {
            client.db.set(message.guild.id, msg.id, `[${Number(args[0])}].message`)
            return message.channel.send("✅ **Success!**")
        }
    }
}
