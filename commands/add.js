module.exports = {
    name: "add",
    execute: async function(client, message, args) {
            let panel = Number(args[0])
            if(isNaN(panel)) return message.channel.send("❌ Invalid panel ID.")
            let en = client.db.ensure(message.guild.id, [])[panel]
            if(!en) return message.channel.send("❌ There is no panel with this ID.")
            args.shift()
            let odp = args.join(" ").split(" && ")
            if(!odp[1]) return message.channel.send("❌ Invalid usage! You need to provide `< question > && < answer >`! (You can use enter in answer)")
            client.db.ensure(message.guild.id, [], `[${panel}].keys`)
            client.db.push(message.guild.id, {
                "q": odp[0],
                "a": odp[1]
            }, `[${panel}].keys`)
            message.channel.send("✅ **Sucess!**")
    }
}
