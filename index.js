const discord = require('discord.js');
const bot = new discord.Client();

const prefix =('+');

const emoji_tank = "🛡";
const emoji_heal = "⛑";
const emoji_dps = "⚔";

var dps=[];
var tank=[];
var heal=[];

bot.on('ready', async ()=> {
    console.log(`logged in  as ${bot.user.username} !`);
    //TODO make it dynamic?
    const discord_guild = bot.guilds.find(val => val.name === 'ahla wa sahla');
    const chan_bot = discord_guild.channels.find(val => val.name === 'mythicqueue');
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

//bot.on ('message', message =>{
    ////test que le bot est fonctionel
    /*
     *if(message.content === '!mm'){
     *    //const message_intro =
     *    message.channel.send('Join queue for MM dungeons')
     *        .then(function (message) {
     *            message.react("🛡")
     *            message.react("⚔")
     *            message.react("⛑")
     *        }).catch(console.error);
     *}
     */

    ////controle sur la file actuel
    //if (dps.length >= 3 && tank.length >= 1 && heal.length >= 1){
        //[>message.reply('le groupe est full a vos clavier : @'
        //+Dps[0].username+'#'+Dps[0].discriminator
        //+' @'+Dps[1].username+'#'+Dps[1].discriminator
        //+' @'+Dps[2].username+'#'+Dps[2].discriminator
        //+' @'+Tank[0].username+'#'+Tank[0].discriminator
        //+' @'+heal[0].username+'#'+heal[0].discriminator);*/
        //message.channel.send(`le groupe est full à vos claviers : ${dps[0]}, ${dps[1]}, ${dps[2]} en tant que DPS , ${tank[0]} en TANK et ${heal[0]} en heal Bonne chance :D`);
        
        //dps.splice(0,3);
        //heal.splice(0,1);
        //tank.splice(0,1);
    //}

    ////pour s'ajouter au file d'attente il faut envoyer un messgae +{role} 
    //if(message.content === prefix + 'dps'){
        
        //dps.push(message.author)
        //message.reply(dps.length + '/3 Dps '+tank.length+'/1 Tank '+heal.length+'/1 heal ');
    //}
    //if(message.content === prefix + 'tank'){
        //tank.push(message.author)
        //message.reply(dps.length + '/3 Dps '+tank.length+'/1 Tank '+heal.length+'/1 heal ');
    //}
    //if(message.content === prefix + 'heal'){
        //heal.push(message.author)
        //message.reply(dps.length + '/3 Dps '+tank.length+'/1 Tank '+heal.length+'/1 heal ');
    //}

//});


bot.on('messageReactionAdd', (reaction, user) => {
    var u_name = user.username;
    var is_dps = dps.indexOf(u_name);
    var is_tank = tank.indexOf(u_name);
    var is_heal = heal.indexOf(u_name);
    if (reaction.message.content === 'Join queue for MM dungeons auto' && !user.bot){

        //controle sur la file actuel
        if (dps.length >= 3 && tank.length >= 1 && heal.length >= 1){
            message.channel.send(`Le groupe est full à vos claviers : ${dps[0]}, ${dps[1]}, ${dps[2]} en tant que DPS , ${tank[0]} en TANK et ${heal[0]} en heal Bonne chance :D`);
        
            dps.splice(0,3);
            heal.splice(0,1);
            tank.splice(0,1);
        }

        if (reaction.emoji.name === emoji_tank){
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
        reaction.message.reply(dps.length + '/3 Dps '+tank.length+'/1 Tank '+heal.length+'/1 heal ');
    }
});

bot.login('NTU4Njc4NjkwNDE0NzIzMTIy.D3an3Q.RTpLKXqADIH-18d8yS2sRpOmD4Q');
