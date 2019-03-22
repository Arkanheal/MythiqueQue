const discord = require('discord.js');
const bot = new discord.Client();

const prefix =('+');
const chan_bot = bot.channels.find('name', 'mythicqueue');

var Dps=[];
var Tank=[];
var heal=[];

bot.on('ready',()=> {
    console.log(`logged in  as ${bot.user.username} !`);
    //chan_bot.send('Join queue for MM dungeons');
    
});

bot.on ('message', msg =>{
    //test que le bot est fonctionel
    if(msg.content === '!mm'){
        const message_intro = msg.channel.send('Join queue for MM dungeons');
        message_intro.react('U+1F6E1');
        message_intro.react('U+26D1');
        message_intro.react('U+2694');
    }
    //controle sur la file actuel
    if (Dps.length >= 3 && Tank.length >= 1 && heal.length >= 1){
        /*msg.reply('le groupe est full a vos clavier : @'
        +Dps[0].username+'#'+Dps[0].discriminator
        +' @'+Dps[1].username+'#'+Dps[1].discriminator
        +' @'+Dps[2].username+'#'+Dps[2].discriminator
        +' @'+Tank[0].username+'#'+Tank[0].discriminator
        +' @'+heal[0].username+'#'+heal[0].discriminator);*/
        msg.channel.send(`le groupe est full a vos clavier : ${Dps[0]}, ${Dps[1]}, ${Dps[2]} en tant que DPS , ${Tank[0]} en TANK et ${heal[0]} en heal Bonne chance :D`);
        
        Dps.splice(0,3);
        heal.splice(0,1);
        Tank.splice(0,1);
    }
    //pour s'ajouter au file d'attente il faut envoyer un messgae +{role} 
    if(msg.content === prefix + 'dps'){
        
        Dps.push(msg.author)
        msg.reply(Dps.length + '/3 Dps '+Tank.length+'/1 Tank '+heal.length+'/1 heal ');
    }
    if(msg.content === prefix + 'tank'){
        Tank.push(msg.author)
        msg.reply(Dps.length + '/3 Dps '+Tank.length+'/1 Tank '+heal.length+'/1 heal ');
    }
    if(msg.content === prefix + 'heal'){
        heal.push(msg.author)
        msg.reply(Dps.length + '/3 Dps '+Tank.length+'/1 Tank '+heal.length+'/1 heal ');
    }

});


bot.on('messageReactionAdd', (reaction, user) => {
    var u_name = user.username;
    var is_dps = dps.indexOf(u_name);
    var is_tank = tank.indexOf(u_name);
    var is_heal = heal.indexOf(u_name);
    if (is_tank != -1){
        if (reaction.emoji.name === ':shield:'){
            if (is_dps != -1){
                dps.splice(is_dps, 1);
            } else if (is_heal != -1){
                heal.splice(is_heal, 1);
            }
            tank.push(u_name);
        }
    } else if (is_dps != -1){
        if (reaction.emoji.name === ':crossed_swords:'){
            if (is_tank != -1){
                tank.splice(is_dps, 1);
            } else if (is_heal != -1){
                heal.splice(is_heal, 1);
            }
            dps.push(u_name);
        }
    } else if (is_heal != -1){
        if (reaction.emoji.name === ':helmet_with_cross:'){
            if (is_tank != -1){
                tank.splice(is_dps, 1);
            } else if (is_dps != -1){
                dps.splice(is_heal, 1);
            }
            heal.push(u_name);
        }
    }
});

bot.login('NTU4Njc4NjkwNDE0NzIzMTIy.D3an3Q.RTpLKXqADIH-18d8yS2sRpOmD4Q');
