//require path

var path = require('path');

//module export

module.exports = function(app) {

	// connects to survey page 
	app.get('/survey',function(req, res) {

		res.sendFile(path.join(__dirname + '/../public/survey.html'));
			
	});
	// connects to home page
	app.get('/', function(req, res) {

		res.sendFile(path.join(__dirname + '/../public/home.html'));

	});

	// connects to Search Page page 
	app.get('/petfinder',function(req, res) {

		res.sendFile(path.join(__dirname + '/../public/petfinder.html'));
			
	});
};

