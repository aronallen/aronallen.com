var CHAPTERS = Backbone.Collection.extend({
	"model" : CHAPTER,
	"initialize" : function(models, options){      
		var book = options.book;
		var self = this;  
		
		
		var i = (typeof book.get('first') !== 'undefined') ? book.get('first') : 1;      
		
		 
		//alpha
		if(typeof book.get('last') === 'number'){
			for(i; i <= book.get('last'); i++){ 
				

				
				var c = new CHAPTER({"book" : book, "chapter" : i});
				
				
				this.add(c);
			}	
		}else{
			   
			var ch = function(i){ 
			   return String.fromCharCode(i);
			};
			
			i = 65;
			
			for(i; ch(i-1) !== book.get('last'); i++){
			   	var c = new CHAPTER({"book" : book, "chapter" : ch(i)});
				this.add(c); 
			}			
			
		}
		

		    
		
     
	},
	"fetch" : function(){
		var self = this;
		var fetch = function(i){
			return function(){
				if(self.models[i]){
					self.models[i].fetch({callback : fetch(i+1)});
				}
			};
		};
		fetch(0)();
	}
});