var BOOK = Backbone.Model.extend({
	"defaults" : {
		"name" : "Første Mosebog",
		"nick" : "1mos",
		"last" : 50,
		//collection reference
		"chapters" : null
	},                         
	
	"initialize" : function(){
		this.set({"chapters" : new CHAPTERS(null, {"book" : this})});
	},
	
	"fetch" : function(){
		this.get("chapters").fetch();
	}
	
});