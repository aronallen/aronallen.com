  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26715892-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


$(document).ready(function(){
	
	$('#wrp-cnt').css({'margin-bottom' : '0px'})
	$('#wrp-sb').css({'position' : 'static'});
	
	
	$('.cnt').hide(0);

	
	if(window.location.hash !== ''){
		$(window.location.hash).show(0);
		$(window.location.hash + '-lnk').addClass('active');
	}else{
		location.hash = 'home';
	}
	
	$("a").click(function(){
		if($(this).attr('href')[0] == '#'){
			_gaq.push(['_trackPageview', '#' + $(this).text().toLowerCase()]);
		}
	});
	
	var x = 0;
	var y = 0;
	
	var previousX = 0;
	var previousY = 0;
	
	$(window).mousemove(function(e){
		

		if (Math.abs(previousX - e.pageX) > 40){
		if (e.pageX < previousX && x != 0){
			x++;
		}
		

		if (e.pageX > previousX && x != -6){
			x--;
		}
		
		previousY = e.pageY;
		previousX = e.pageX;
		
		
		}
		

		
		$(".potriat").css({'background-position' : x + 'px' + ' ' + y + 'px'});
		

	});


	var emailriddlerarray=[109,101,64,97,114,111,110,97,108,108,101,110,46,99,111,109]
	var encryptedemail_id98='' //variable to contain encrypted email 
	for (var i=0; i<emailriddlerarray.length; i++)
	encryptedemail_id98+=String.fromCharCode(emailriddlerarray[i]);
		
	var email_text = '<b><a title="This link will open your email client." href="mailto:'+ encryptedemail_id98 + '">email</a></b>';
	
	$('.email').text(encryptedemail_id98);
	$('.email').css({'font-weight':'bold'});
	$('.email-text').html(email_text);

	var fliped = '';
	
	$('.container').hover(function(){
		fliped = $(".first h3",$(this).parent()).text();
	
		_gaq.push(['_trackEvent', 'App', 'Flip', fliped]);
		console.log('Fliped: ' + fliped);
		
	},function(){
		
	})
	
	$(window).hashchange(function(){
		
	
		hash = location.hash;
		
		$(".active").removeClass('active');
		$(".cnt").slideUp(100);
		$(hash).slideDown(100);
		$(hash + "-lnk").addClass('active');
	});
});

