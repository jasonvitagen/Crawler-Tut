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

behaviors.getArticleLinksFromCategory = function (args, callback) {
	if (!args) {
		return callback('No args');
	}
	if (!args.body) {
		return callback('No category body');
	}

	var $ = cheerio.load(args.body)
		, articleLinks = [];

	$('.post').each(function (i, article) {
		var articleLink = {};
		articleLink.link = $(this).find('.duplicate-title a').attr('href');
		articleLink.thumnail = $(this).find('.thumbs img').attr('src');
		articleLinks.push(articleLink);
	});

	callback(null, articleLinks);

}

module.exports = behaviors;