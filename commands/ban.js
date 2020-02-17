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
  name: 'ban',
  description: 'Banned ein Spieler wenn der Befehlgeber genügend Rechte hat.',
  cooldown: 3,
  args: true,
  execute(message) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            const embed = {
            "color": 16000215,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
              "text": "Insane#0001"
            },
            "fields": [
              {
                "name": "Der User wurde erfolgreich gebanned!",
                "value": "```"+user.tag+"```"
              }
            ]
          };
            message.channel.send({ embed });
          }).catch(err => {
            const embed = {
            "color": 16000215,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
              "text": "Insane#0001"
            },
            "fields": [
              {
                "name": "**Error**",
                "value": "Ich konnte diesen User leider nicht bannen!"
              }
            ]
          };
            message.channel.send({ embed });
          });
        } else {
          const embed = {
          "color": 16000215,
          "timestamp": new Date(),
          "footer": {
            "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
            "text": "Insane#0001"
          },
          "fields": [
            {
              "name": "**Ban Error**",
              "value": "Dieser Spieler ist nicht in diesem Server"
            }
          ]
        };
          message.channel.send({ embed });
        }
      } else {
        const embed = {
        "color": 16000215,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
          "text": "Insane#0001"
        },
        "fields": [
          {
            "name": "**Ban Error**",
            "value": "Du hast nicht angegeben wer gebanned werden soll!?"
          }
        ]
      };
        message.channel.send({ embed });
      }
    } else {
      const embed = {
      "color": 16000215,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "https://cdn.discordapp.com/avatars/620918779093975061/83b36e28d7cf1e45dc182d30e2d50ecd.png",
        "text": "Insane#0001"
      },
      "fields": [
        {
          "name": "**Ban Error**",
          "value": "Du hast nicht die Berechtigung diesen User zu bannen!"
        }
      ]
    };
      message.channel.send({ embed });
    }
  },
};
