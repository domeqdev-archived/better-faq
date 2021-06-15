const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "setup",
    execute: async function(client, message, args) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("❌ You need to have **MANAGE_GUILD** permissions in order to use this command.")
        
        const embed = new MessageEmbed().setColor("#508939");
            if(client.db.ensure(message.guild.id, []).length >= 1) return message.channel.send("❌ Your guild already has 2 panels.")
            let msg = await message.channel.send(`**1.** Choose nice panel name. (\`Will be showed in message\`)`, embed.setDescription(`To cancel type \`cancel\`. You have **30** seconds to answer.`))
            let gname = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 })
            if(!gname.first() || gname.first().content.toLowerCase() === 'cancel') return msg.edit("❌ Cancelled.") && msg.suppressEmbeds(true)
            let name = gname.first().content;

            await msg.edit(`**2.** Please select where panel will be created.`, embed.setDescription(`To cancel type \`cancel\`. You have **30** seconds to answer.`))
            const gchannel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 })
            if(!gchannel.first() || gchannel.first().content.toLowerCase() === 'cancel') return msg.edit("❌ Cancelled.") && msg.suppressEmbeds(true)
            let channel = gchannel.first().mentions.channels.first() || message.guild.channels.cache.get(gchannel.first().content)
            if(!channel) return msg.edit("❌ Invalid channel.") && msg.suppressEmbeds(true)

            await msg.edit(`**3.** Please select role if user has non-listed question. (\`This can be used to show #support channel.\`)`, embed.setDescription(`To cancel type \`cancel\`. To skip type \`skip\`. You have **1** minute to answer.\n:warning: Role ${message.guild.me.roles.highest} must be in highest place than selected role.`))
            const grole = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 60000 })
            if(!grole.first() || grole.first().content.toLowerCase() === 'cancel') return msg.edit("❌ Cancelled.") && msg.suppressEmbeds(true)
            let role = grole.first().mentions.roles.first() || message.guild.roles.cache.get(grole.first().content)
            if(!role || role.rawPosition >= message.guild.me.roles.highest.rawPosition) role = ""

            if(role) {
                await msg.edit(`**4.** Enter custom message if user has non-listed question.`, embed.setDescription(`To cancel type \`cancel\`. You have **60** seconds to answer.`).setImage("https://isis.tools/raw/em8246FDB.png"))
                const gcustom = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 60000 })
                if(!gcustom.first() || gcustom.first().content.toLowerCase() === 'cancel') return msg.edit("❌ Cancelled.") && msg.suppressEmbeds(true)
                let custom = gcustom.first().content;
            } else {
                let custom = ""
            }
            

            msg.delete()
            client.db.push(message.guild.id, { 
                "name": name, 
                "channel": channel.id,
                "message": "", 
                "custom": custom,
                "role": role.id,
                "keys": []
            })
            message.channel.send(`✅ Success created panel with ID \`${client.db.ensure(message.guild.id, []).length - 1}\`!`, embed.setDescription(`➥ **[FULL SETUP GUIDE](https://docs.discord4.fun/guide/better-faq)**`))
    }
};
