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
		, title = $('.viewtitle h1').text()
		, content = '';

	$('.usercontent script').replaceWith('');
	$('.usercontent ins').replaceWith('');
	content = $('.usercontent').html();
	content = content.replace(/(\n|\r)/gm, '');

	callback(null, {
		title : title,
		content : content
	});

}

module.exports = behaviors;