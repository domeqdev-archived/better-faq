const { inspect } = require("util");
const hastebin = require("hastebin-gen");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { ReactionCollector } = require('discord.js-collector');


module.exports = {
	name: "eval",
    hide: true,
    execute: async function(client, message, args) {
        if (client.config.ownerID !== message.author.id) return;
        if(!args[0]) return;
          try {
            const code = args.join(" ");
            let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = inspect(evaled);
                  if (evaled.includes(client.token)) return message.reply(`result includes bot token.`);
           
                    if(evaled.length >= 1950) {
                      let link = await hastebin(evaled).catch(() => {return message.reply("bruh hastebin not work. try console.log")});
                        
                      message.channel.send(`Result has more than 1950 characters. ${link}`);
                    } else {
                      message.channel.send(`\`\`\`js\n${evaled.toString()}\n\`\`\``);
                    }
              } catch (err) {
                message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
              }
    }
};