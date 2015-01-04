var mongoose = require('mongoose');

var crawledArticleSchema = mongoose.Schema({
	created : {
		type : Date,
		default : Date.now
	},
	title     : String,
	thumbnail : String,
	content   : String
});

module.exports = mongoose.model('CrawledArticle', crawledArticleSchema);