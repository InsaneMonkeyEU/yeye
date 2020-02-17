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
const moment = require("moment");

const status = {
    online: "Online",
    idle: "Abewesend/Afk",
    dnd: "Bitte nicht stören",
    offline: "Offline/Unsichtbar"
};

module.exports = {
  name: 'userinfo',
  aliases: ['whois', 'info'],
  description: 'Sucht Infos über den User raus.',
  cooldown: 5,
  execute(message, args) {
    var permissions = [];
    var acknowledgements = 'None';

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    if(message.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }

    if(message.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }

    if(message.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }

    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }

    if(message.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("Keine Berechtigungen gefunden.");
    }

    if(`<@${member.user.id}>` == message.guild.owner){
        acknowledgements = 'Server Owner';
    }

    const embed = new Discord.RichEmbed()
        .setFooter('Insane#0001', 'https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png')
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor(randomColor)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp(new Date())
        .addField("Status",`${status[member.user.presence.status]}`, true)
        .addField('Joined at: ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Created at: ",`${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Permissions: ", `${permissions.join(', ')}`, true)
        .addField(`Roles [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join("   **|**   ") || "No Roles"}`, true)
        .addField("Acknowledgements: ", `${acknowledgements}`, true)
        .addField("User ID: ", `${message.author.id}`, true);

    message.channel.send({embed});
  },
};
