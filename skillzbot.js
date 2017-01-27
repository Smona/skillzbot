var Sequelize = require('sequelize');

// Load Environment configurations
require('dotenv').config();

var db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_TYPE
});

/*
	$user = $_POST['user_name'];
	$userid = $_POST['user_id'];
	$skills = $_POST['text'];
	$newskills = strtolower($skills);
	$command = $_POST['command'];
	$token = $_POST['token'];
	if ($command == "/whoknows") {
		$validtoken = 'REDACTED';
	} elseif ($command == "/iknow") {
		$validtoken = 'REDACTED';
	} else {
		echo "invalid command";
	}
	// Verify token

	if($token != $validtoken){
	    $msg = "The token for the slash command doesn't match. Check your script.";
	    die($msg);
	    echo $msg;
	}


	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

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
