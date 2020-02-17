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
	name: 'reload',
	description: 'Reloaded ein Command.',
	args: true,
	execute(message, args) {
		if(message.author.id == botownerid) {
			const commandName = args[0].toLowerCase();
			const command = message.client.commands.get(commandName)
				|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return message.channel.send(`Dieser Command exestiert nicht! \`${commandName}\`, ${message.author}!`);
			}

			delete require.cache[require.resolve(`./${commandName}.js`)];

			try {
				const newCommand = require(`./${commandName}.js`);
				message.client.commands.set(newCommand.name, newCommand);
			} catch (error) {
				console.log(error);
				return message.channel.send(`Es gab ein Fehler beim  reloaden des Commands \`${commandName}\`:\n\`${error.message}\``);
			}
			message.channel.send(`Command \`${commandName}\` wurde reloaded!`);
		}
	},
};
