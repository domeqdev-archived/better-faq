const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    execute: async function(client, message, args) {
        message.channel.send(new MessageEmbed()
            .setAuthor(`Hi! I'm ${client.user.username}.`, client.user.displayAvatarURL({ dynamic: true }), client.config.link)
            .setColor("#508939")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`
➥ \`@${client.user.username} help\` - All bot commands and important links.
➥ \`@${client.user.username} list\` - List of all setups in the server.
➥ \`@${client.user.username} vote\` - Check voting status.

➥ \`@${client.user.username} setup\` - Interactive setup (First setup).
➥ \`@${client.user.username} add < Panel ID > < Question > && < Answer >\` - Add Q&A to panel.
➥ \`@${client.user.username} publish < Panel ID >\` - Publish FAQ panel.
➥ \`@${client.user.username} delete < Panel ID >\` - Delete FAQ panel.


➥ **[FULL SETUP GUIDE](https://docs.discord4.fun/guide/better-faq)**
            `)
            .addField("\u200B", `📡 Invite me to your server by **[CLICKING HERE](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)**\n🛠 Join to our community, check out **[SUPPORT SERVER](https://discord.gg/8jQP52j)**\n🎉 Vote on **[TOP.GG](https://top.gg/bot/786666749630218291/vote)** and get **premium**!`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        );
    }
};
