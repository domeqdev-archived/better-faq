const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

const manager = new ShardingManager('./bot.js', {
    totalShards: 'auto',
    token: token
});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`[ Shard #${shard.id} ] Attempting to load...`));