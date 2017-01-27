var http = require('http');
var Sequelize = require('sequelize');
var util = require('./lib/util');

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
	var skills = data.text;
	var command = data.command;
	var token = data.token;

	Users.findOrCreate({where: {ID: post.user_id}, defaults: {ID: post.user_id, username: post.user_name, skills: ''} })
	.spread(function(user, created) {
		console.log(user.get({
			plain: true
		}));
		console.log(created);
		
		// Verify command and access token
		if (command === '/iknow' && token === process.env.SLACK_IKNOW_TOKEN) {
			iknow(user, skills);
		} else if (command === '/whoknows' && token === process.env.SLACK_WHOKNOWS_TOKEN) {
			whoknows(skills);
		} else {
			callback('There is an error in your slack app configuration. Go to your app settings by ' +
						'clicking on the skillzbot username and make sure your commands and access tokens are correct.');			
		}
	});
}

function iknow(user, skills) {
	console.log('iknow command runs...');
}

function whoknows(skills) {
	console.log('whoknows command runs...');
}
/*
	$newskills = strtolower($skills);

	// iknow command
	if ($command == '/iknow') {
		$result = $conn->query("SELECT skills FROM devs WHERE ID='$userid'");
		if ($result->num_rows > 1) {
			die("Oops! You have duplicate entries. Please contact <@smona>.");
		} elseif ($result->num_rows == 1) {
			$oldskills = $result->fetch_row()[0];
		} else {
			$oldskills = FALSE;
		}
		// User is viewing skills
		if (chop($skills) == "") {
			if ($oldskills != FALSE) {
				echo "*The things you're good at:*\n" . str_replace(" ", "\n", $oldskills);
				echo "\n*Add more terms your comrades might search for;* don't miss an opportunity to support the Revolution!" ;
			} else {
				echo "_You have no skillz!_ Or more likely, you haven't added them. ";
				echo "Run /iknow followed by a space-separated list of skills you have.";
			}
		// User is modifying skillz
		} else {
			// User already had skillz
			if ($oldskills != FALSE) {
				$oldskills = explode(" ", $oldskills);
				$newskills = explode(" ", $newskills);
				foreach ($newskills as &$skill) {
					$skill = trim($skill);
				}
				$updatedskills = array_merge($oldskills, $newskills);
				$updatedskills = array_unique($updatedskills);
				$updatedskills = implode(" ", $updatedskills);
				$sql = "UPDATE devs
				SET skills='$updatedskills'
				WHERE ID='$userid'";

				if ($conn->query($sql) === TRUE) {
			    	echo "*New skillz!* You now know:\n" . str_replace(" ", "\n", $updatedskills);
				} else {
				    echo "Error: " . $sql . "<br>" . $conn->error;
				}
			// User didn't previously have skillz
			} else {
				$sql = "INSERT INTO devs (ID, username, skills)
				VALUES ('$userid', '$user', '$newskills')";

				if ($conn->query($sql) === TRUE) {
			    	echo "*New skillz!* You now know:\n" . str_replace(" ", "\n", $newskills);
						echo "\n*Add more terms your comrades might search for;* don't miss an opportunity to support the Revolution!" ;
				} else {
				    echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
		}
	}

	if ($command == '/whoknows') {

		if (chop($skills) == "") {
			echo "List some skillz to match revolutionaries who know them";
		} else {
			$newskills = explode(" ", $newskills);
			foreach ($newskills as &$skill) {
				$skill = trim($skill);
				$users[$skill] = [];
			}

			$result = $conn->query("SELECT * FROM devs WHERE 1");
			while ($row = $result->fetch_assoc()) {
				foreach ($users as $skill => &$people) {
					if (gettype(strpos($row["skills"], $skill)) == "integer") {
						array_push($people, "<@" . $row["username"] . ">");
					}
				}
			}
			foreach ($users as $skill => &$people) {
				if (count($people) == 0) {
					echo ":slightly_frowning_face: *Sorry,* didn't find anyone who knows $skill. ";
					echo "If you find them, tell them to run /iknow!\n";
				} else {
					echo ":celebrate: *Woo!* These volunteers know $skill:\n";
					echo implode(", ", $people) . "\n";
				}
			}
		}
	}

	$result->close();

	$conn->close();
 ?>
*/
