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

	$('#mainContent script').replaceWith('');
	$('#mainContent ins').replaceWith('');
	content = $('#mainContent').html();
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

	$('.life-list li').each(function (i, article) {
		var articleLink = {};
		articleLink.link = 'http://www.life.com.tw' + $(this).find('a').attr('href');
		articleLink.thumnail = $(this).find('img').attr('src');
		articleLinks.push(articleLink);
	});

	callback(null, articleLinks);

}

module.exports = behaviors;