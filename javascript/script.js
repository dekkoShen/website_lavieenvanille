$(document).ready(function(){

	/*---------------------------------------------------------------------
	define global parameters & input the information of file
	---------------------------------------------------------------------*/
	var folderName   = "content";      //fold for content html
	var homeFileName = "homeCover";    //the file name of homepage html
	var addr         = "";             //actived content name


	/*---------------------------------------------------------------------
	define some functions for hyperlink
	---------------------------------------------------------------------*/
	/* filePosition */
	var filePosition = function (XfileName) {
		return "./" + folderName + "/"+ XfileName + ".html" ;
	};

	/* link to the content html and adds 'active' class, except homepage */
	var linkContent = function( XlinkID, XfileName ){
		$('#content').load( filePosition(XfileName), function(){
			$(this).children(':first').unwrap();       //'#content' within 'content' ==> need to unwrap
		});
		addr = XfileName;
		if ( XfileName===homeFileName ) {
			$('#header .nav a').removeClass('active');
		} else{
			$(XlinkID).addClass('active');
			$(XlinkID).siblings().removeClass('active');	
		};
	};

	/* setup click function for htperlink */
	var clickLinkContent = function( XlinkID, XfileName ){
		$(XlinkID).click(function(){
			if( addr != XfileName) {
				linkContent( XlinkID, XfileName );
			};
		});
	};


	/*---------------------------------------------------------------------
	setup the click function for nav-hyperlink and homepage
	---------------------------------------------------------------------*/
	/* setup the homepage */
	linkContent( '#link_content_homeCover', homeFileName );

	/* click function for nav-hyperlink */
	clickLinkContent( '#link_content_homeCover', homeFileName );
	clickLinkContent( '#link_content_news',      "news"      );
	clickLinkContent( '#link_content_profile',   "profile"   );
	clickLinkContent( '#link_content_work',      "work"      );
	clickLinkContent( '#link_content_lesson',    "lesson"    );
	clickLinkContent( '#link_content_blog',      "blog"      );
	clickLinkContent( '#link_content_contact',   "contact"   );


	/*---------------------------------------------------------------------
	setup function for #footerHome 
	---------------------------------------------------------------------*/
	var $footerHome = $('#link_content_homeCover_footerHome')

	/* scroll down and showup */
	$footerHome.css('opacity','0.2');
	$(window).scroll(function(){
		if ( $(document).scrollTop() >= $('#header').height() ) {
			$footerHome.animate({opacity:0.9},{duration:100,queue:false});
		} else{
			$footerHome.animate({opacity:0.2},{duration:100,queue:false});
		};
	});

	/* hover effect */
	$footerHome.hover(function(){
		$footerHome.find('img').css('width','3rem');
	},function(){
		$footerHome.find('img').css('width','2.5rem');
	});

	/* seup function : scroll back to origin */
	$footerHome.click(function(){
		$('html, body').animate({scrollTop: 0},400);
		if ( $(document).scrollTop() < $('#header').height() ) {
			linkContent( '#link_content_homeCover_footerHome', homeFileName );
		};
	});


	/*---------------------------------------------------------------------
	preload images 
	---------------------------------------------------------------------*/
	/* setup preload function */
	$.preloadImages = function() {
		for (var i = 0; i < arguments.length; i++) {
			$("<img />").attr("src", arguments[i]);
		};
	};
	/* preload images */
	$.preloadImages(
        "./images/line.png"
    );


});
