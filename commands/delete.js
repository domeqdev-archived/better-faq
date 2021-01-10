const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "delete",
    execute: async function(client, message, args) {
        const embed = new MessageEmbed().setColor("#508939");
        if(isNaN(Number(args[0]))) return message.channel.send("❌ Invalid panel ID.")
        let panel = client.db.ensure(message.guild.id, [])[Number(args[0])]
        if(!panel) return message.channel.send("❌ There is no panel with this ID.")
        client.db.delete(message.guild.id, `[${Number(args[0])}]`)
        return message.channel.send("✅ **Removed!**")
    }
}
