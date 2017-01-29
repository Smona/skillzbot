module.exports = function(table, skills, callback) {
	console.log('whoknows command runs...');
	if (skills === '') {
		callback('List some skillz to match revolutionaries who know them!');
	} else {
		skills = skills.split(' ');

		var matches = {};
		skills.forEach(function(skill) {
			matches[skill] = [];
		});

		// Find users that have each skill
		table.findAll().then(function(users) {
			users.forEach(function(user) {
				skills.forEach(function(skill) {
					if (user.skills.search(` ${skill} `) !== -1) {
						matches[skill].push(user.username);
					}
				});
			});

			// Build response
			var response = '';
			for (skill in matches) {
				matchUsers = matches[skill];
				if (matchUsers.length === 0) {
					response += ':slightly_frowning_face: *Sorry,* didn\'t find anyone who knows ${skill}. ' +
					'If you find them, tell them to run /iknow!\n';
				} else {
					console.log(skill + ': ' + matchUsers);
					response += `:celebrate: *Woo!* These volunteers know ${skill}:\n` +
					`<@${matchUsers.join('>, <@')}>\n`;
				}
			}
			// Send it
			callback(response);
		});
	}
};

