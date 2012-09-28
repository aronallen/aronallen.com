var DB = openDatabase("CHAPTERS", "1.0", "All the chapters in the world", 5 * 1024 * 1024);


DB.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS chapters (nick unique, text)');
});



var CHAPTER = Backbone.Model.extend({
    'defaults': {
        'book': null,
        'chapter': 1,
        'content': null,
        'references': true,
        'name': 'Kapitel 1'
    },

    'initialize': function(a) {

        if (a.chapter === 0) {
            this.set({
                "name": "Prolog"
            });
        } else {
            this.set({
                "name": "Kapitel " + a.chapter
            });
        }




        this.set({
            "nick": a.book.get("nick") + a.chapter
        });
        this.load();

    },
      
	
    'fetch': function(options) {
        var self = this;
        console.log(this.url_content());



        if (this.get('content') === null) {

            //get content
            $.get(this.url_content(),
            function(d, s, jqXHR) {
                if (s === 'success') {

                    if (d.responseText) {
                        d = d.responseText;
                    }

                    d = self.domify(d);
                    self.save(d);



                    if (options && options.callback) {
                        clearTimeout(timeout);
                        timeout = setTimeout(options.callback, 2000);
                    }

                }

            },
            "HTML");
        } else {
            if (options && options.callback) options.callback();
        }


    },


    'url_content': function() {
        var URL = 'http://old.bibelselskabet.dk/danbib/web/';

        var b = this.get("book").get("nick");
        var c = this.get("chapter");

        return URL + b + '/' + c + 'b.htm';
    },

    'save': function(d) {
        var self = this;
        DB.transaction(
        function(tx) {
            tx.executeSql("INSERT INTO chapters (nick, text) VALUES (?, ?)", [self.get("nick"), d.html()]);
        }
        );
    },

    'load': function() {
        var self = this;
        DB.transaction(
        function(tx) {
            tx.executeSql("SELECT * FROM chapters WHERE nick=?", [self.get("nick")],
            function(tx, results) {
                if (results.rows.length) {
					if(results.rows.item(0).text){
                    	self.domify(results.rows.item(0).text);
					}
                }
            });
        }
        );
    },

    'domify': function(d) {
        var self = this;

        d = $("<div>").html(d);
        $("link", d).remove();
        if ($("h2:first", d).length && self.get("chapter")) {
            var n = $("h2:first", d).text();
            if (typeof self.get("book").get("last") === 'number') {
                self.set({
                    name: self.get('chapter') + ': ' + n
                });
            } else {
                self.set({
                    name: n
                });
            }
        }
        self.set({
            content: d
        });
        return d;
    },

    'url_references': function() {
        var URL = 'http://old.bibelselskabet.dk/danbib/web/';

        var b = this.get("book").get("nick");
        var c = this.get("chapter");

        return URL + b + '/ch' + c + '/v1.htm';
    }
});