var cheerio = require('cheerio')
	, behaviors = {};

behaviors.getArticle = function (args, callback) {

	if (!args) {
		return callback('No args');
	}
	if (!args.body) {
		return callback('No article body');
	}

	var $ = cheerio.load(args.body)
		, title = $('.aricle-detail-top h1').text()
		, content = '';

	content = $('#mainContent').html();
	content = content.replace(/(\n|\r)/gm, '');

	callback(null, {
		title : title,
		content : content
	});

}

module.exports = behaviors;