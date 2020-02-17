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
const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Eine Liste mit allen Commands! (Oder die Info eines Commands).',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		var data = new Discord.RichEmbed()
			.setTitle("Commands")
	    .setDescription(`Du kannst ${prefix}help [command name] machen um Hilfe für einen Command zu bekommen, oder mit ${prefix}help alle commands sehen!`)

		const { commands } = message.client;

		if (!args.length) {
			data.addField(`>>> **${commands.map(command => " "+command.name)}**`, "Insane#0001");

			return message.author.send(data)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Ich habe dir eine DM mit all meinen Commands geschickt!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('Es sieht so aus als könnte ich dir keine DM schicken... Hast du es vielleicht in deinen Discord Einstellungen deaktiviert?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Diesen Command gibt es leider nicht. Hast du dich vielleicht verschrieben?');
		}

		data.addField(`**Name:**`, command.name);

		if (command.aliases) data.addField(`**Aliases:**`, command.aliases.join(', '));
		if (command.description) data.addField(`**Description:**`, command.description);
		if (command.usage) data.addField(`**Usage:**`, prefix+command.name+" Usage: "+command.usage);

		data.addField(`**Cooldown:**`, command.cooldown || 3 + `second(s)`);

		message.channel.send(data);
	},
};
