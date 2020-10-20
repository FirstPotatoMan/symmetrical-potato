const xlg = require('../xlogger')
const checkAccess = require('../utils/checkaccess')

module.exports = {
    name: 'list',
    description: 'add a helper role to a channel',
    async execute(client, message, args) {
        try {
            // check for perms
            if (!(await checkAccess(message))) return;
            // if no args, send detailed help (args not required)
            /*if (args.length < 2) {
                return message.channel.send({
                    embed: {
                        color: config.info_color,
                        description: `__**Ping Assist: List Helper Roles**__\nUse \` list \` in the channel you wish to see the roles listed for.`
                    }
                }).catch(xlg.error);
            }*/
            args.shift();
            // check for channel
            var hm = require('../helpermaps.json');

            if (hm[message.channel.id] && Object.keys(hm[message.channel.id]).length > 0) {
                let helpKeys = Object.keys(hm[message.channel.id]);
                let helpList = Object.values(hm[message.channel.id]).map((r, i) => {
                    return `${helpKeys[i]} -> ${message.guild.roles.cache.get(r) || "**no-role**"}`
                });
                return message.channel.send({
                    embed: {
                        color: config.info_color,
                        description: `${helpList.join("\n")}`
                    }
                }).catch(xlg.error);
            } else {
                var config = require("../config.json");
                return message.channel.send({
                    embed: {
                        color: config.warn_color,
                        description: `__**Ping Assist: List Helper Roles**__\nUse \` ${config.prefix}list \` in the channel you wish to see the roles listed for.\n\n> **there are no helper roles for this channel**`
                    }
                }).catch(xlg.error);            
            }
        } catch (error) {
            message.channel.send({
                embed: {
                    color: config.fail_color,
                    description: `This bot is lacking the required permissions.`
                }
            }).catch(xlg.error);
        }
    }
}