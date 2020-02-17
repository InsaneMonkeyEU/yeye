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
  name: 'leaveserver',
  description: 'Lässt den Bot den Server verlassen, Owner only.',
  args: true,
  cooldown: 5,
  async execute(message, args) {
    if(message.author.id == botownerid) {
      try {
        message.client.guilds.get(args[0]).leave();
        message.channel.send("Left Guild " + args[0]);
      }
      catch(error) {
        message.channel.send("Errored ```" + error + "```");
      }


    }
  },
};
