$(document).ready(function(){

	/* input the name of folder */
	var folderName = "content" ;

	/* set up the cover page */
	var addr = "homeCover";
	$(function(){
		$('#content').load("./" + folderName + "/homeCover.html", function(){
			$(this).children(':first').unwrap();       //'#content' within 'content' ==> need to unwrap
		}); 
	});
	$('#header .nav a').removeClass('active');


	/* setup content-linking function */
	var linkContent = function( linkID, fileName ){
		var filePosition = "./" + folderName + "/"+ fileName + ".html"
		$(linkID).click(function(){
			if( addr != fileName) {
				$('#content').load(filePosition, function() {
					$(this).children(':first').unwrap();
				});
				addr = fileName;
				if ( fileName==="homeCover" ) {
					$('#header .nav a').removeClass('active');
				} else{
					$(linkID).addClass('active');
					$(linkID).siblings().removeClass('active');	
				};
			};
		});
	};

	/* content-linking */
	linkContent( '#link_content_homeCover', "homeCover" );
	linkContent( '#link_content_news',      "news"      );
	linkContent( '#link_content_profile',   "profile"   );
	linkContent( '#link_content_work',      "work"      );
	linkContent( '#link_content_lesson',    "lesson"    );
	linkContent( '#link_content_blog',      "blog"      );
	linkContent( '#link_content_contact',   "contact"   );


	/* setup footerHome function */
	var $footerHome = $('#link_content_homeCover_footerHome')
	//scroll down and showup
	$footerHome.css('opacity','0.2');
	$(window).scroll(function(){
		if ( $(document).scrollTop() >= $('#header').height() ) {
			$footerHome.animate({opacity:0.9},{duration:100,queue:false});
		} else{
			$footerHome.animate({opacity:0.2},{duration:100,queue:false});
		};
	});
	//hover effect
	$footerHome.hover(function(){
		$footerHome.find('img').css('width','3rem');
	},function(){
		$footerHome.find('img').css('width','2.5rem');
	});
	//seup function : scroll back to origin
	$footerHome.click(function(){
		$('html, body').animate({scrollTop: 0},400);
	});



	/* preload images */
	$.preloadImages = function() {
		for (var i = 0; i < arguments.length; i++) {
			$("<img />").attr("src", arguments[i]);
		};
	};
	//preload_content_lesson
	$.preloadImages(
        "./images/line.png"
    );

});
