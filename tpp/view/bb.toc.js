var TOC = Backbone.View.extend({
	"render" : function(title){
		  
		var el = $(this.el);
		
		el.attr('class', 'TOC');  
		
		
		if(title){
			el.append($("<div>", {'class' : 'header'}).text(title));
		}
		 
		
		
		$.each(this.collection.models, function(i, v){
			
			var cell = $("<div>", {'class' : 'cell'});
			

			  
			                
			
			var render = function(cell, model){
				return function(){
					cell.empty(); 
				  	cell.append($("<p>", {'class' : 'name'}).text(model.get('name')));    
				   

					if(model.get('chapters')){
						cell.attr('data-nick', model.get('nick'));
						
						cell.append($("<p>", {'class' : 'count'}).text(model.get('chapters').length));

						if(model.get('chapters').length === 1){
							$("p.count", cell).addClass('single');
						}
					}
					
					if(typeof model.get('chapter') !== 'undefined'){
						
						cell.attr("data-chapter", model.get("chapter"));
						cell.attr("data-nick", model.get("book").get("nick"));
					}  
				};
			};
			
			
			
			this.bind("change:name", render(cell, this));
			
			render(cell, this)();
			                                          
			
			el.append(cell); 
			
			if(this.get('nick') === '1mos'){
			   	cell.before($("<div>", {'class' : 'header'}).text("Det Gamle Testamente"));
			}
			
			if(this.get('nick') === 'matt'){
			   	cell.before($("<div>", {'class' : 'header'}).text("Det Nye Testamente"));
			}
			
			if(this.get('nick') === 'tob'){
			   	cell.before($("<div>", {'class' : 'header'}).text("De Apokryfe Skrifter"));
			}
			
		});   
		
		
		
		
	},
	"dismiss" : function(){
		$(this.el).hide();
	}
});