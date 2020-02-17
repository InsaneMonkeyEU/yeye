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
const fetch = require("node-fetch");
const fs = require('fs');
const Discord = require('discord.js');
const {
  botownerid,
  prefix,
  token,
  apiKey,
  statusMessage,
  statusType
} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
  console.log(` --------- \n Hey! \n --------- \n Eingeloggt als ${client.user.tag}! \n Owner ID wurde gesetzt auf: ${botownerid} \n Der Prefix ist: ${prefix} \n FNAPI key: ${apiKey} \n ---------`);
  client.user.setActivity(`${statusMessage}`, {type: `${statusType}`})
  client.user.setStatus('dnd')
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('Ich kann Befehle nicht in Dms erledigen, sorry!');
  }

  if (command.args && !args.length) {
    let reply = `Du hast kein befehl angegeben!, ${message.author}!`;

    if (command.usage) {
      reply += `Meintest du: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Bitte warte ${timeLeft.toFixed(1)} Sekunden bevor du \`${command.name}\` wieder nutzt!`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Es gab ein fehler beim Ausführen dieses Befehls!');
  }
});

client.login(token);
