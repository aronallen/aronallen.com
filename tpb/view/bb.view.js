var VIEW = Backbone.View.extend({
	"render" : function(){
		$(this.el).attr('class', 'CHAPTER');
		var v = this;
		     
		if(this.model.get("content")){
			$(this.el).html(this.model.get("content")); 
			this.clean();
		}else{
			this.model.fetch();
			this.model.bind("change:content", function(){
			   	$(v.el).html(v.model.get("content")); 
				v.clean();
			});
		}
		
		
	},
	
	'clean' : function(){
		
		$("a", this.el).attr('href', null);
		$("a", this.el).attr('target', null);
		        
		
		var menu = $("<div>", {'class' : 'menu'});   
		
		var b = this.model.get("book");
		var c = this.model.get("chapter");
		var n = this.model.get("name");   
		var cc = this.model.collection.models;
		                                      
		if(c){
			menu.append($("<p>").text(b.get("name") + " " + c));
		}
		else{
			menu.append($("<p>").text(b.get("name") + " – Prolog"));
		}  
		
		var i = _.indexOf(cc, this.model); 		   
  
		if(i + 1 < cc.length){    
			var nxt = $("<a>", {'class' : 'next', 'href' : '#/book/' + b.get('nick') + '/' + cc[i + 1].get('chapter') }); 
			nxt.text(">");
			menu.append(nxt);
		}
		
		if(i){    
			var prv = $("<a>", {'class' : 'prev', 'href' : '#/book/' + b.get('nick') + '/' + cc[i - 1].get('chapter') }); 
			prv.text("<");
			menu.append(prv);
		}
		
		
		$(this.el).prepend(menu);
  		$(this.el).append(menu.clone());
  	

	}
});