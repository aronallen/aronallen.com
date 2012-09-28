var BOOKS = Backbone.Collection.extend({
	"model" : BOOK,
	"fetch" : function(){
		$.each(this.models, function(){
		  this.fetch();  
		});
	}
});