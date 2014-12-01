var request = require('request')
	, cheerio = require('cheerio')
	, fs = require('fs')
	, async = require('async')
	, jquery = fs.readFileSync('public/javascripts/jquery.js', 'utf-8')
	, articleData = [];


function getArticlesList (done) {

	request.get('http://www.teepr.com/', function (err, response, body) {
		if (!err && response.statusCode == 200) {
			var $ = cheerio.load(body);
			$('.latestPost > a').each(function (index, article) {
     			var link = $(this).attr('href');
     			var thumbnail = $(this).find('img').attr('src');
     			articleData.push({
     				link : link,
     				thumbnail : thumbnail
     			});
     		});
			return done();
		}
	});
}

function getArticle (done) {

	async.each(articleData, function (articleData, done) {

		var link = articleData.link
			, thumbnail = articleData.thumbnail;

		request(link, function (err, response, body) {
			if (!err && response.statusCode == 200) {

				var $ = cheerio.load(body);

				var title = $('.single-title').text();
				console.log($('.featured-thumbnail img'));

				$('.post-single-content .topad').replaceWith('');
				$('.post-single-content .post-page-number').replaceWith('');
				$('.post-single-content .mid-post-ad').replaceWith('');
				$('.post-single-content script').replaceWith('');
				var content = $('.post-single-content').html();
				content = content.replace(/(\n|\r)/gm, '');

				fs.appendFile('articles.txt', title + '\n' + thumbnail + '\n' + content + '\n\n', function (err) {
					return done();
				});

			}
		});
	});
}

async.series([getArticlesList, getArticle], function (err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log('Crawled successful!');
	}
});