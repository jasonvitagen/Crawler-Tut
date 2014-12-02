var request = require('request')
	, cheerio = require('cheerio')
	, fs = require('fs')
	, async = require('async')
	, jquery = fs.readFileSync('public/javascripts/jquery.js', 'utf-8')
	, imgur = require('./imgur');


// imgur.setClientId('fe831b31baf537f');

// imgur.uploadUrl('http://farm3.staticflickr.com/2858/9646274624_490c8337bb_o.jpg')
//     .then(function (json) {
//     	console.log(json);
//         console.log(json.data.link);
//     })
//     .catch(function (err) {
//         console.error(err.message);
//     });

function getArticlesList (done) {

	request.get('http://www.teepr.com/', function (err, response, body) {
		var articleData = [];
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
			return done(null, articleData);
		}
	});
}

function getArticle (articleData, done) {
	console.log(articleData);
	async.each(articleData, function (article, done) {

		var link = article.link
			, thumbnail = article.thumbnail;

		request(link, function (err, response, body) {
			if (!err && response.statusCode == 200) {

				var $ = cheerio.load(body);

				var title = $('.single-title').text();

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
	}, function (err, results) {
		if (err) {
			done(err);
		} else {
			done();
		}
	});
}

async.waterfall([getArticlesList, getArticle], function (err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log('Crawled successful!');
	}
});