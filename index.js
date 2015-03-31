var Teepr = require('./plugins/crawlers/teepr')
	, Gigacircle = require('./plugins/crawlers/gigacircle')
	, Lifetw = require('./plugins/crawlers/lifetw')
	, fs = require('fs')
	, async = require('async')
	, request = require('request');


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
// 	articleLink : 'http://www.teepr.com/89622/jason-mraz%E5%8F%B0%E5%8C%97%E6%BC%94%E5%94%B1%E6%9C%83%E6%89%BE%E4%BE%86%E8%A7%80%E7%9C%BE/'
// }, function (err, article) {
// 	console.log(article);
// 	fs.writeFile('demo.txt', JSON.stringify(article), function (err) {

// 	});
// });

// Gigacircle.getArticle({
// 	articleLink : 'http://tw.gigacircle.com/3378584-1'
// }, function (err, article) {
// 	console.log(article);
// });

// Lifetw.getArticle({
// 	articleLink : 'https://www.life.com.tw/?app=view&no=215328'
// }, function (err, article) {
// 	// fs.writeFile('demo.txt', article.content, function (err) {
// 	// });
// 	console.log(article);
// });

// Teepr.getArticleLinksFromCategory({
// 	categoryLink : 'http://www.teepr.com/category/%E5%BD%B1%E7%89%87/'
// }, function (err, articleLinks) {
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log(articleLinks);
// });

// Lifetw.getArticleLinksFromCategory({
// 	categoryLink : 'https://www.life.com.tw/?app=category&act=categorylist&no=8'
// }, function (err, articleLinks) {
// 	if (err) {
// 		return console.log(err);
// 	}

// });

var crawlCategory = function (args) {

	if (!args) {
		return console.log('No args');
	}
	if (!args.crawler) {
		return console.log('No "crawler" arg');
	}
	if (!args.categoryLink) {
		return console.log('No "categoryLink" arg');
	}
	if (!args.checkUniqueArticleLinksUrl) {
		return console.log('No "checkUniqueArticleLinksUrl" arg');
	}
	if (!args.postArticlesUrl) {
		return console.log('No "postArticlesUrl" arg');
	}
	if (!args.category) {
		return console.log('No "category" arg');
	}
	console.log('a');
	var getArticleLinks = function (done) {
		console.log('b');
		args.crawler.getArticleLinksFromCategory({
			categoryLink : args.categoryLink
		}, function (err, articleLinks) {
			if (err) {
				console.log('Get article links error');
				done(err);
			}
			done(null, articleLinks);
		});
	}
//'http://tw.gigacircle.com/s32-1'
// 'http://localhost:3000/crawled/filter-out-duplicate-article-links'
	var getUniqueArticleLinks = function (articleLinks, done) {
		console.log('c');
		request.post(args.checkUniqueArticleLinksUrl, {
			form : {
				articleLinks : articleLinks
			}
		}, function (err, response, body) {
			if (!err && response.statusCode == 200) {
				body = JSON.parse(body);
				if (body.err) {
					return done(body.err);
				} else {
					console.log('get unique article links ok');
					return done(null, body.articleLinks);
				}
			} else {
				return done('Error in getting unique article links');
			}
		});
	}

	var getArticles = function (articleLinks, done) {
		console.log('d');
		var crawledArticles = [];
		async.each(articleLinks, function (articleLink, okay) {
			console.log(articleLink);
			args.crawler.getArticle({
				articleLink : articleLink.link,
				articleThumbnail : articleLink.thumbnail,
				category : args.category
			}, function (err, article) {
				if (err) { // ignore error
					okay();
				} else {
					crawledArticles.push(article);
					okay();
				}
			});
		}, function (err) {
			if (err) { // ignore error
				done(null, crawledArticles);
			} else {
				done(null, crawledArticles);
			}
		});

	}

	var postArticles = function (crawledArticles, done) {
		console.log('e');
		// fs.writeFile('demo.txt', JSON.stringify(crawledArticles), function (err) {

		// });
//'http://localhost:3000/crawled/get-crawled-articles'
		var options = {
			url: args.postArticlesUrl,
			headers : {
				'Authentication' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoicWlzaGVuLmNoZW5nIiwic2NvcGVzIjpbImFwcHJvdmVDcmF3bGVkQXJ0aWNsZSIsImNhbkVkaXREZWxldGVBcnRpY2xlIiwiY2FuQWNjZXNzQ29udHJvbFBhbmVsIl0sImlhdCI6MTQyNzYzOTM3N30.HG3RjjRVUeb5JkyRJ0f0hbjVRfRgkQx76Q1XRW_MqoE'
			},
			form : {
				articles : crawledArticles
			}
		};

		request.post(options, function (err, response, body) {
			if (!err && response.statusCode == 200) {
				body = JSON.parse(body);
				if (body.err) {
					return done(body.err);
				} else {
					return done();
				}
			} else {
				return done('Error in posting articles');
			}
		});
	}

	async.waterfall([getArticleLinks, getUniqueArticleLinks, getArticles, postArticles], function (err, results) {
		if (err) {
			return console.log(err);
		}
		console.log('All tasks completed');
	});	

}

crawlCategory({

	crawler : Gigacircle,
	categoryLink : 'http://tw.gigacircle.com/s31-1',
	checkUniqueArticleLinksUrl : 'http://localhost:3000/crawled/filter-out-duplicate-article-links',
	postArticlesUrl : 'http://localhost:3000/crawled/get-crawled-articles',
	category : '生活'

});

