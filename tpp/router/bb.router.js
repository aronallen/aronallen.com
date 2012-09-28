var ROUTER = Backbone.Router.extend({
	routes : {
		"/:book/:chapter" : "chapter",
		"" : "book"
	},
	
	
	chapter : function(b, c){
		$(BOOK_VIEW.el).hide();
		
		var d = null;
		
		$.each(BOOK_VIEW.collection.models, function(){
		     
			console.log(this.get("chapter"));
			if(this.get("chapter") == c){
				d = this;
			}
		}); 
		
		CHAPTER_VIEW.model = d;
		CHAPTER_VIEW.render();
		
		$(CHAPTER_VIEW.el).show();
		window.scrollTo(0,.9);
		
		
	},  
	
	
	
	book : function(book){
		  
		
		
		$(CHAPTER_VIEW.el).hide();
		
		$(BOOK_VIEW.el).show();
		$(BOOK_VIEW.el).height();
		
		this.track();
		window.scrollTo(0,.9);
		
	},
   
	track : function(){                
		_gaq.push(['_trackPageview', window.location.hash]);  
	}
	
		
	
});