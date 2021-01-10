module.exports = (client, message) => {
    if(message.author.bot) return;
    if(!message.guild) return message.channel.send(":warning: **This command cannot be used in private messages**")
    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') || !message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return;

    const match = message.content.match(`^<@!?${client.user.id}>`)
        if(match) {
            if(!match[0]) return console.log('1');
        else {
            const args = message.content.slice(match[0].length + 1).trim().split(/ +/);
            let command = args.shift().toLowerCase();

            var cmd = client.commands.get(command);
        
            if(cmd) {
                cmd.execute(client, message, args);
            } else {
                client.commands.get('help').execute(client, message, args);
            }
        }
    }

};