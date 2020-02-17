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
const { botownerid } = require('./../config.json');
module.exports = {
  name: 'status',
  description: 'Ändert den Bot Status, Owner only! ;)',
  args: true,
  cooldown: 5,
  execute(message, args) {
    if(message.author.id == botownerid) {
      message.client.user.setStatus(`${args}`);
      const embed = {
      "color": 16000215,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
        "text": "Insane#0001"
      },
      "fields": [
        {
          "name": "Status changed to",
          "value": "```"+args+"```"
        }
      ]
    };
      message.channel.send({ embed });
    }
  },
};
