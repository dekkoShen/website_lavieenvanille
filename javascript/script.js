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

	/* setup content-linking function */
	var linkContent = function( linkID, fileName ){
		var filePosition = "./" + folderName + "/"+ fileName + ".html"
		$(linkID).click(function(){
			if( addr != fileName) {
				$('#content').load(filePosition, function() {
					$(this).children(':first').unwrap();
				});
				addr = fileName;
			};
			//scroll back to origin
			$('html, body').animate({scrollTop: 0},1);
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


	/* preload images */
	$.preloadImages = function() {
		for (var i = 0; i < arguments.length; i++) {
			$("<img />").attr("src", arguments[i]);
		};
	};
	//preload_content_lesson
	$.preloadImages(
        "./images/line.png",
        "./images/lesson_20141026.jpg"
    );

});
