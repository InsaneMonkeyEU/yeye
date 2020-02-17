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
module.exports = {
  name: 'ping',
  description: 'Siehe dir den Ping des Bots an.',
  cooldown: 5,
  execute(message) {
    message.channel.send('Ping?')
    .then(m => {
      m.edit(`Pong! Dies brauchte nur: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })
  },
};
