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
		, title = $('.single-title').text()
		, content;

	$('.post-single-content .topad').replaceWith('');
	$('.post-single-content .post-page-number').replaceWith('');
	$('.post-single-content .mid-post-ad').replaceWith('');
	$('.post-single-content script').replaceWith('');
	content = $('.post-single-content').html();
	content = content.replace(/(\n|\r)/gm, '');

	callback(null, {
		title   : title,
		content : content
	});

}


module.exports = behaviors;