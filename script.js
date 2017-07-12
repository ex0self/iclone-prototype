//FULLSCREEN TOGGLE 
function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;
	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
}

$(document).ready(function () {
	//Form validation
	$("#registerForm").submit(function (event) {
		event.preventDefault();
		console.log("it works funciton");

		if (nonEmpty() == false) {
			console.log("empty fields");

			$("#Error").text("Fill Out Empty Fields").show();

			return;

		}
		if (validEmail() == false) {
			//send an valid email error msg
			console.log("bad email");

			$("#Error").text("Invalid Email Address").show();

			return;
		}
		console.log("gut email");


		if (passwordsMatch() == false) {

			$("#Error").text("Passwords don't match").show();
			return;
		}

		if (usernameTaken() == false) {

			$("#Error").text("Username is taken").show();
			return;
		}

		console.log("all good");
		$.mobile.changePage("#page3", {
			transition: "pop",
			reverse: false,
			changeHash: false
		});

	});


});


function validEmail() {
	var email = $("#email").val();
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
//		$("#Error").text("Validated...").show();

function nonEmpty() {

	if ($("#email").val().length === 0) {
		return false;
	}
	return true;
}

function passwordsMatch() {
	if ($("#password").val() === $("#confirmpassword").val()) {
		return true;

	}
	return false;


}

function usernameTaken() {
	$.post("checkUsername.php", {
		user: $("#username").val()
	}, function (data) {
		if (data == '1') {
			return true;
		} else if (data == '0') {
			return false;
		}
	});
}

function emailTaken() {
	$.post("checkEmail.php", {
		email: $("#email").val()
	}, function (data) {
		if (data == '1') {
			return true;
		} else if (data == '0') {
			return false;
		}
	});
}

// Log in page validation
/*
function validate() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	if (username == "") {
		alert("Please enter a User Name")
		formLogin.username.focus()
		return false
	}
	if (password == "") {
		alert("Please enter a Password")
		formLogin.password.focus()
		return false
	}
	if (username == "Test" && password == "test#123") {
		alert("Login successfully");
		window.location = "gameboard.html";
		return false;
	} else {
		alert("Login failed - Please enter correct Username and Password")
	}
}
*/

//twitter 
var configProfile = {
	"profile": {
		"screenName": 'elonmusk'
	},
	"domId": 'exampleProfile',
	"maxTweets": 20,
	"enableLinks": false,
	"showUser": false,
	"showTime": false,
	"showImages": false,
	"lang": 'en',
	"dateFunction": '',
	"showRetweet": false,
	"customCallback": handleTweets,
	"showInteraction": false
};

var allTweets = [];
var tweetIndex = 0;

function handleTweets(tweets) {
	allTweets = tweets;
}

//twitterFetcher.fetch(configProfile);
var appendDelayed = function (content, delayTime) {
	setTimeout(function () {
		$('#chat-area').append(content);
		console.log("delay time done");
	}, delayTime);
}

$(document).ready(function () {
	//Form validation
	$("#chatForm").hide();
	$("#chatForm").submit(function (event) {
		event.preventDefault();
		//$( "p" ).show( 4000, function() {
		$("#chat-area").append('<div class="message-data"><span class="message-data-name"><i class="fa fa-circle you"></i>' + loginUsername + '</span></div>');


		$("#chat-area").append('<div class="message you-message">' + $("#chatInput").val() + '</div>');
		$("#chatInput").val("");

		appendDelayed('<li class="clearfix"><div class="message-data align-right"><span class="message-data-name">' + configProfile.profile.screenName + '</span> <i class="fa fa-circle me"></i></div>', 1000);

		appendDelayed('<div class="message me-message float-right">' + allTweets[tweetIndex] + "</div></li>", 1000);
		tweetIndex++;
		if (tweetIndex == allTweets.length) {
			tweetIndex = 0;
		}

	})

	// get twitter id
	$("#twitter-profile").submit(function (event) {
		$("#twitter-profile").fadeOut();
		$("#chatForm").fadeIn();
		event.preventDefault();
		configProfile.profile.screenName = $("#profile-id").val();
		twitterFetcher.fetch(configProfile);
		console.log('getting new tweets');
		appendDelayed('<li class="clearfix"><div class="message-data align-right"><span class="message-data-name">' + configProfile.profile.screenName + '</span> <i class="fa fa-circle me"></i></div>', 1000);
		appendDelayed('<div class="message me-message float-right">Hi, I\'m a clone of ' + configProfile.profile.screenName + '</div></li>', 1000);
		appendDelayed('<div class="message me-message float-right">I\'m still in my baby stage but I\'ll try to keep up with the conversation.</div></li>', 2000);

	})


});
// login script
var loginUsername = "";
$('document').ready(function () {
	/* validation */
	$("#login-form").validate({
		rules: {
			password: {
				required: true,
			},
			username: {
				required: true,
			},
		},
		messages: {
			password: {
				required: "please enter your password"
			},
			user_email: "please enter your email address",
		},
		submitHandler: submitForm
	});
	/* validation */

	/* login submit */
	function submitForm() {
		var data = $("#login-form").serialize();

		$.ajax({

			type: 'POST',
			url: 'login_process.php',
			data: data,
			beforeSend: function () {
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
			},
			success: function (response) {
				if (response == "ok") {
					loginUsername = $("#username").val();
					$("#btn-login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');
					setTimeout(' window.location.href = "#page3"; ', 4000);
				} else {

					$("#error").fadeIn(1000, function () {
						$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + ' !</div>');
						$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
					});
				}
			}
		});
		return false;
	}
	/* login submit */
});
