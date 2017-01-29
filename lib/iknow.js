module.exports = function(user, newskills, callback) {
	console.log('iknow command runs...');
	// User is viewing their skills
	if (newskills === '') {
		if (user.skills === '') {
			callback('_You have no skillz!_ Or more likely, you haven\'t added them yet.\n' +
				'Run /iknow followed by a space-separated list of skills you have.');
		} else {
				callback('*The things you\'re good at:*\n' +
				user.skills.replace(/ /g, '\n') +
				'\n*Add more terms your comrades might search for;* don\'t miss an opportunity to support the Revolution!'); 
		}
	} else {
	// User is adding new skills
		// Merge skill lists
		newskills = newskills.split(' ');
		oldskills = user.skills.split(' ');
		newskills.forEach(function(skill, index) {
			if (oldskills.indexOf(skill) === -1) {
				oldskills.push(skill);
			} else {
				newskills.splice(index, 1);
			}
		});
		updatedSkills = oldskills.sort().join(' ');

		// Update the database entry
		user.update({ skills: updatedSkills }).then(function() {
			console.log('Added skills to ' + user.username + ': ' + ((newskills.length == 0) ? 'none' : newskills));
			callback('*New skillz!* You now know:\n' + updatedSkills.replace(/ /g, '\n') +
			'\n*Add more terms your comrades might search for;* don\'t miss an opportunity to support the Revolution!');
		});
	}
};