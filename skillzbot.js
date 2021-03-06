var http = require('http');
var Sequelize = require('sequelize');
var util = require('./lib/util');
var iknow = require('./lib/iknow');
var whoknows = require('./lib/whoknows');

// Load Environment configurations
require('dotenv').config();

// Initialize db connection
var db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_TYPE
});

var Users = db.define('users', {
  ID: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  skills: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users'
});

Users.sync();

http.createServer(function (request, response) {
	util.getPost(request, function(post) {
		console.log('Request received\nUser: ' + post.user_name + '\nID: ' + post.user_id);
		queryDB(post, function(result) {
			// Send the HTTP header
			// HTTP Status: 200 : OK
			// Content Type: text/plain
			response.writeHead(200, {'Content-Type': 'text/plain'});

			// Send the response body as "Hello World"
			response.end(result);			
		});
	});
}).listen(process.env.PORT);

console.log('Server running at http://127.0.0.1:8081/');

function queryDB(data, callback) {
	//var username = data.user_name;
	//var userid = data.user_id;
	var skills = data.text.toLowerCase().trim();
	var command = data.command;
	var token = data.token;

	Users.findOrCreate({where: {ID: data.user_id}, defaults: {ID: data.user_id, username: data.user_name, skills: ''} })
	.spread(function(user, created) {
		console.log(user.get({
			plain: true
		}));
		console.log('created user entry: ' + created);
		
		// Verify command and access token
		if (command === '/iknow' && token === process.env.SLACK_IKNOW_TOKEN) {
			iknow(user, skills, callback);
		} else if (command === '/whoknows' && token === process.env.SLACK_WHOKNOWS_TOKEN) {
			whoknows(Users, skills, callback);
		} else {
			callback('There is an error in your slack app configuration. Go to your app settings by ' +
						'clicking on the skillzbot username and make sure your commands and access tokens are correct.');			
		}
	});
}

