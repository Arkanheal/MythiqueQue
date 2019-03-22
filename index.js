const discord = require('discord.js');
const bot = new discord.Client();

const prefix =('+');

var Dps=[];
var Tank=[];
var heal=[];

bot.on('ready',()=> {
    console.log(`logged in  as ${bot.user.username} !`);
});

bot.on ('message', msg =>{
    //test que le bot est fonctionel
    if(msg.content === 'ping'){
        msg.reply('pong!');
    }
    //controle sur la file actuel
    if (Dps.length >= 3 && Tank.length >= 1 && heal.length >= 1){
        msg.reply('le groupe est full a vos clavier : @'+Dps[0].username+' @'+Dps[1].username+' @'+Dps[2].username+' @'+Tank[0].username+' @'+heal[0].username);
        Dps.splice(0,3);
        heal.splice(0,1);
        Tank.splice(0,1);
    }
    //pour s'ajouter au file d'attente il faut envoyer un messgae +{role} 
    if(msg.content === prefix + 'dps'){
        console.log(msg.author);
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
})
bot.login('NTU4Njc4NjkwNDE0NzIzMTIy.D3an3Q.RTpLKXqADIH-18d8yS2sRpOmD4Q');
