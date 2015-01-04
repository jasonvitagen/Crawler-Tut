var Teepr = require('./plugins/crawlers/teepr')
	, Gigacircle = require('./plugins/crawlers/gigacircle')
	, Lifetw = require('./plugins/crawlers/lifetw');

// var imgur = new Imgur({
// 	clientId : 'fe831b31baf537f'
// });

// imgur.uploadUrl({
// 	imageUrl : 'http://farm3.staticflickr.com/2858/9646274624_490c8337bb_o.jpg'
// }, function (err, response) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(response.body);
// 	}
// });

// function getArticlesList (done) {

// 	request.get('http://www.teepr.com/', function (err, response, body) {
// 		var articleData = [];
// 		if (!err && response.statusCode == 200) {
// 			var $ = cheerio.load(body);
// 			$('.latestPost > a').each(function (index, article) {
//      			var link = $(this).attr('href');
//      			var thumbnail = $(this).find('img').attr('src');
//      			articleData.push({
//      				link : link,
//      				thumbnail : thumbnail
//      			});
//      		});
// 			return done(null, articleData);
// 		}
// 	});
// }

// function getArticle (articleData, done) {
// 	console.log(articleData);
// 	async.each(articleData, function (article, done) {

// 		var link = article.link
// 			, thumbnail = article.thumbnail;

// 		request(link, function (err, response, body) {
// 			if (!err && response.statusCode == 200) {

// 				var $ = cheerio.load(body);

// 				var title = $('.single-title').text();

// 				$('.post-single-content .topad').replaceWith('');
// 				$('.post-single-content .post-page-number').replaceWith('');
// 				$('.post-single-content .mid-post-ad').replaceWith('');
// 				$('.post-single-content script').replaceWith('');
// 				var content = $('.post-single-content').html();
// 				content = content.replace(/(\n|\r)/gm, '');

// 				fs.appendFile('articles.txt', title + '\n' + thumbnail + '\n' + content + '\n\n', function (err) {
// 					return done();
// 				});

// 			}
// 		});
// 	}, function (err, results) {
// 		if (err) {
// 			done(err);
// 		} else {
// 			done();
// 		}
// 	});
// }

// async.waterfall([getArticlesList, getArticle], function (err, results) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Crawled successful!');
// 	}
// });

// Teepr.getArticle({
// 	articleLink : 'http://www.teepr.com/87785/7%E6%AD%B2%E5%B0%8F%E7%94%B7%E5%AD%A9%E5%9C%A8%E5%B9%B3%E5%AE%89%E5%A4%9C%E8%A6%81%E5%81%B7%E6%8B%8D%E8%81%96%E8%AA%95%E8%80%81%E4%BA%BA%E7%9A%84%E8%B9%A4%E8%B7%A1%EF%BC%8C%E6%B2%92%E6%83%B3%E5%88%B0/'
// }, function (err, article) {
// 	console.log(article);
// });

// Gigacircle.getArticle({
// 	articleLink : 'http://tw.gigacircle.com/3378584-1'
// }, function (err, article) {
// 	console.log(article);
// });

Lifetw.getArticle({
	articleLink : 'https://www.life.com.tw/?app=view&no=215328'
}, function (err, article) {
	console.log(article);
});
