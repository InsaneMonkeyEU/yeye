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
const { prefix } = require('./../config.json');
module.exports = {
  name: 'nick',
  description: 'Ändert den Nickname des Users im Server.',
  args: true,
  cooldown: 5,
  async execute(message, args) {
    if (message.member.hasPermission('CHANGE_NICKNAME')) {
      let withoutPre = message.content.replace(`${prefix}nick `, "");
      let newNick = withoutPre.replace(args[0] + " ", "");
      let user = args[1];
      console.log(newNick);
      try {
        message.guild.members.get(user).setNickname(newNick);
        console.log(message.mentions.users.first());
        message.channel.send(`${message.mentions.users.first().tag}'s name ist jetzt **${newNick}** auf diesem Server.`);
      }
      catch {
        message.channel.send(`Fehler beim ändern des nicknamens von ${message.mentions.users.first().tag}`);
      }
    }

    /*
    let description;

    if (args.length) {
      await message.guild.me.setNickname(args.join(' '));
      message.channel.send(`Nick is now set to **${args.join(' ')}** on this server.`);
    }
    else {
      await message.guild.me.setNickname('');
      message.channel.send('Nick has been reset on this server.');
    }
    */
  },
};
