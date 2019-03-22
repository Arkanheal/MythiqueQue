const discord = require('discord.js');
const bot = new discord.Client();

const prefix =('+');
const chan_bot = bot.channels.find('name', 'mythicqueue')

//TODO add a filter to not take in account reaction from same user
const filter = (reaction) => reaction.emoji.name === 'U+1F6E1'
const filter_dps = (reaction) = reaction.emoji.name === 'U+26D1'		
const filter_heal = (reaction) = reaction.emoji.name === 'U+2694'	
const collector_tank = message.createReactionCollector(filter);
const collector_dps = message.createReactionCollector(filter_dps);
const collector_heal = message.createReactionCollector(filter_heal);

var dps=[];
var tank=[];
var heal=[];

bot.on('ready',()=> {
    console.log(`logged in  as ${bot.user.username} !`);
    message_intro = channel.send('Join queue for MM dungeons')
});

bot.on ('message', msg =>{
    //test que le bot est fonctionel
    if(msg.content === 'ping'){
        msg.reply('pong!');
    }
    //controle sur la file actuel
    if (dps.length >= 3 && tank.length >= 1 && heal.length >= 1){
        /*msg.reply('le groupe est full a vos clavier : @'
        +dps[0].username+'#'+dps[0].discriminator
        +' @'+dps[1].username+'#'+dps[1].discriminator
        +' @'+dps[2].username+'#'+dps[2].discriminator
        +' @'+tank[0].username+'#'+tank[0].discriminator
        +' @'+heal[0].username+'#'+heal[0].discriminator);*/
        msg.channel.send(`le groupe est full a vos clavier : ${dps[0]}, ${dps[1]}, ${dps[2]} en tant que DPS , ${tank[0]} en TANK et ${heal[0]} en heal Bonne chance :D`);
        
        dps.splice(0,3);
        heal.splice(0,1);
        tank.splice(0,1);
    }
    //pour s'ajouter au file d'attente il faut envoyer un messgae +{role} 
    if(msg.content === prefix + 'dps'){
        
        dps.push(msg.author)
        msg.reply(dps.length + '/3 dps '+tank.length+'/1 tank '+heal.length+'/1 heal ');
    }
    if(msg.content === prefix + 'tank'){
        tank.push(msg.author)
        msg.reply(dps.length + '/3 dps '+tank.length+'/1 tank '+heal.length+'/1 heal ');
    }
    if(msg.content === prefix + 'heal'){
        heal.push(msg.author)
        msg.reply(dps.length + '/3 dps '+tank.length+'/1 tank '+heal.length+'/1 heal ');
    }
})
bot.login('NTU4Njc4NjkwNDE0NzIzMTIy.D3an3Q.RTpLKXqADIH-18d8yS2sRpOmD4Q');
