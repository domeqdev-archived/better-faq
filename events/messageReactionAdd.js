const emojis = {
    "1️⃣": 0,
    "2️⃣": 1,
    "3️⃣": 2,
    "4️⃣": 3,
    "5️⃣": 4,
    "6️⃣": 5,
    "7️⃣": 6,
    "8️⃣": 7,
    "9️⃣": 8,
    "🔟": 9
}
const { MessageEmbed } = require('discord.js');

module.exports = async(client, reaction, user) => {
    if (reaction.partial) {
		  try {
			  await reaction.fetch();
		  } catch (error) {
			  console.error(error);
			  return;
		  }
    }
    if(reaction.me) return;
    if(!client.db.has(reaction.message.channel.guild.id)) return;
    let dane = client.db.ensure(reaction.message.channel.guild.id, []).find(val => val.message === reaction.message.id)
    if(!dane) return;
    if(emojis[reaction._emoji.name] || emojis[reaction._emoji.name] == 0) {
        user.send(`${reaction._emoji.name}  **${dane.keys[emojis[reaction._emoji.name]].q}**`, new MessageEmbed().setDescription(dane.keys[emojis[reaction._emoji.name]].a).setColor("#508939")
        ).catch(() => {
            reaction.message.channel.send(`${user}, you need to enable dms.`).then(msg => msg.delete({ timeout: 7500 }))
        })
    } else if(reaction._emoji.name === "❓" && dane.role) {
        reaction.message.channel.guild.members.cache.get(user.id).roles.add(dane.role).then(() => {
            reaction.message.channel.send(`${user}, you got access to further assistance.`).then(msg => msg.delete({ timeout: 7500 }))
        }).catch(() => {
            reaction.message.channel.send(`${user}, you need to contact server owner, I don't have perms to add you role.`).then(msg => msg.delete({ timeout: 10000 })).catch(()  => {})
        })
    } else {
        reaction.remove().catch(() => {})
    }
    reaction.users.remove(user.id).catch(() => {})
}