/*
    Dilithium Project, an advance Discord bot that makes use of a modular command handler.
    Copyright (C) 2019 Syfe

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/
const Discord = require('discord.js');
let days = 0;
let week = 0;
module.exports = {
  name: 'uptime',
  description: 'Zeigt wie lange der bot schon online ist.',
  cooldown: 5,
  args: false,
  execute(message, args) {
    let uptime = ``;
    let totalSeconds = (message.client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){
        days = days + 1;
        hours = 0;
    }

    if(days == 7){
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    uptime += `**${days}** tage, **${hours}** stunden, **${minutes}** minuten und **${seconds}** sekunden!`;

    const uptimeembed = new Discord.RichEmbed()
        .setColor("#228B22")
        .setTimestamp(new Date())
        .addField('**Uptime**', uptime)
        .setFooter('Insane#0001', 'https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png');

    message.channel.send(uptimeembed);
  },
};
