const discord = require('discord.js');
const bot = new discord.Client();

const prefix =('+');
const serverName = 'ahla wa sahla';
const channelName = 'mythicqueue';
const emoji_tank = "🛡";
const emoji_heal = "⛑";
const emoji_dps = "⚔";

var dps=[];
var tank=[];
var heal=[];

bot.on('ready', async ()=> {
    console.log(process.env.TOKEN);
    console.log(`logged in  as ${bot.user.username} !`);
    //TODO make it dynamic?
    const discord_guild = bot.guilds.find(val => val.name === serverName);
    const chan_bot = discord_guild.channels.find(val => val.name === channelName);
    chan_bot.send('Join queue for MM dungeons auto')
        .then(async function (message) {
            try{
                await message.react(emoji_tank);
                await message.react(emoji_heal);
                await message.react(emoji_dps);
            }
            catch (error){
                console.error('One emoji failed to react');
                console.error(error);
            }
        }).catch(console.error);
});

bot.on('messageReactionAdd', (reaction, user) => {
    var u_name = user.username;
    var is_dps = dps.indexOf(u_name);
    var is_tank = tank.indexOf(u_name);
    var is_heal = heal.indexOf(u_name);
    if (reaction.message.content === 'Join queue for MM dungeons auto' && !user.bot){
        //controle sur la file actuel
        reaction_array = reaction.message.reactions;
        if (dps.length >= 3 && tank.length >= 1 && heal.length >= 1){
            reaction.message.channel.send(`Le groupe est full à vos claviers : ${dps[0]}, ${dps[1]}, ${dps[2]} en tant que DPS , ${tank[0]} en TANK et ${heal[0]} en heal Bonne chance :D`);
            dps.splice(0,3);
            heal.splice(0,1);
            tank.splice(0,1);
        }
        if (reaction.emoji.name === emoji_tank){
            reaction_array.forEach(function (value, index, array){
                if (value.emoji.name != emoji_tank){
                    user_array = value.users;
                    user_array.forEach(function (user_react, index, array){
                        if(user_react.username === u_name){
                            value.remove(user_react)
                        }
                    });
                }
            });
            if (is_tank === -1){
                tank.push(u_name);
            }
            if (is_heal != -1){
                heal.splice(is_heal, 1);
            }
            if (is_dps != -1){
                dps.splice(is_dps, 1);
            }
        }
        if (reaction.emoji.name === emoji_heal){
            reaction_array.forEach(function (value, index, array){
                if (value.emoji.name != emoji_heal){
                    user_array = value.users;
                    user_array.forEach(function (user_react, index, array){
                        if(user_react.username === u_name){
                            value.remove(user_react)
                        }
                    });
                }
            });
            if (is_heal === -1){
                heal.push(u_name);
            }
            if (is_tank != -1){
                tank.splice(is_tank, 1);
            }
            if (is_dps != -1){
                dps.splice(is_dps, 1);
            }
        }
        if (reaction.emoji.name === emoji_dps){
            reaction_array.forEach(function (value, index, array){
                if (value.emoji.name != emoji_dps){
                    user_array = value.users;
                    user_array.forEach(function (user_react, index, array){
                        if(user_react.username === u_name){
                            value.remove(user_react)
                        }
                    });
                }
            });
            if (is_dps === -1){
                dps.push(u_name);
            }
            if (is_tank != -1){
                tank.splice(is_tank, 1);
            }
            if (is_heal != -1){
                heal.splice(is_heal, 1);
            }
        }
    }
});

bot.on('messageReactionRemove', (reaction, user) => {
    var u_name = user.username;
    var is_dps = dps.indexOf(u_name);
    var is_tank = tank.indexOf(u_name);
    var is_heal = heal.indexOf(u_name);
    if (reaction.message.content === 'Join queue for MM dungeons auto' && !user.bot){
        if (reaction.emoji.name === emoji_tank){
            if (is_tank != -1){
                tank.splice(is_tank, 1);
            }
        }
        if (reaction.emoji.name === emoji_heal){
            if (is_heal != -1){
                heal.splice(is_heal, 1);
            }
        }
        if (reaction.emoji.name === emoji_dps){
            if (is_dps != -1){
                dps.splice(is_dps, 1);
            }
        }
    }
});

//pour voir la file actuel
bot.on('message', msg => {
    if (msg.content == 'ping'){
        msg.reply('pong');
    }
    if (msg.content == prefix+'file') {
        msg.author.send('Dps: '+dps+' Tank: '+tank+' Heal : '+heal);
    }
});

bot.login(process.env.TOKEN);
