var ROUTER = Backbone.Router.extend({
	routes : {
		"/book/:book/:chapter" : "chapter",
		"/book/:book" : "book",   
		"" : "bible"
	},  
	
	
	chapter : function(book, chapter){
		  $("a", $("#header")).text(book);
		  $("a", $("#header")).attr('href', '#/book/' + book);
		  $(BOOK_VIEW.el).hide();
		  $(BIBLE_VIEW.el).hide();
		
		  $.each(BIBLE_VIEW.collection.models, function(){
			   if(this.get('nick') === book){ 
				  $.each(this.get('chapters').models, function(){ 
					 if(this.get('chapter') == chapter){
						CHAPTER_VIEW.model = this;
					}
				  });				
			   }
		  }); 
		             
		  CHAPTER_VIEW.render();                                  
		  $(CHAPTER_VIEW.el).show();
		  $(CHAPTER_VIEW.el).height();
		  this.track();
		  window.scrollTo(0,.9);
		  	
	},
	
	book : function(book){
		  
		$(BIBLE_VIEW.el).hide();
		$(CHAPTER_VIEW.el).hide();
		 
		
		$.each(BIBLE_VIEW.collection.models, function(){ 
			
			if(this.get('nick') === book){
				BOOK_VIEW.collection = this.get('chapters');
				$(BOOK_VIEW.el).empty();
				BOOK_VIEW.collection.fetch();
				
				
				BOOK_VIEW.render(this.get('name'));
			}
		});
		
		
		$(BOOK_VIEW.el).show();
		$(BOOK_VIEW.el).height();
		
		this.track();
		window.scrollTo(0,.9);
		
	},
	
	bible : function(){
		$(BOOK_VIEW.el).hide();
		$(BIBLE_VIEW.el).find(".active").removeClass("active");
		$(BIBLE_VIEW.el).show(); 
		$(CHAPTER_VIEW.el).hide();
		
		this.track(); 
		window.scrollTo(0,.9);
		
		
	},
	track : function(){                
		_gaq.push(['_trackPageview', window.location.hash]);  
	}
	
		
	
});