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
  name: 'kill',
  description: 'Fährt den Bot herunter, Owner only.',
  cooldown: 5,
  execute(message) {
    if(message.author.id == botownerid) {
      const embed = {
      "color": 16000215,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
        "text": "Insane#0001"
      },
      "fields": [
        {
          "name": "**Der Bot fährt jetzt herunter.**",
          "value": "Shutdown wurde ausgeführt!"
        }
      ]
    };
      message.channel.send({ embed });
      message.client.destroy();
    }
  },
};
