$(document).ready(function(){

	/*---------------------------------------------------------------------
	define global parameters & input the information of file
	---------------------------------------------------------------------*/
	var folderName  = "content";      //fold for content html
	var urlPosition = "";             //actived content name, we will use this for url

	var navLinkNumber = 6;            //number of links in the navbar
	var linkID = [                    //information of link
	    /*------------------ linkID[0] : homepage --------------------*/
	    { idName:'#link_content_home',            fileName: "home"    },
	    /*--------------------------- nav ----------------------------*/
	    { idName:'#link_content_news',            fileName: "news"    },
	    { idName:'#link_content_profile',         fileName: "profile" },
	    { idName:'#link_content_work',            fileName: "work"    },
	    { idName:'#link_content_lesson',          fileName: "lesson"  },
	    { idName:'#link_content_blog',            fileName: "blog"    },
	    { idName:'#link_content_contact',         fileName: "contact" },
	    /*-------------------------- other ---------------------------*/
	    { idName:'#link_content_home_footerHome', fileName: "home"    }
	];

	/*---------------------------------------------------------------------
	define some functions for hyperlink
	---------------------------------------------------------------------*/
	/* filePosition */
	var filePosition = function (XfileName) {
		return "./" + folderName + "/"+ XfileName + ".html" ;
	};

	/* link to the content html, adds 'active' class and pushing the browser history */
	var linkContent = function( XlinkID, XfileName, XpushHistory ){
		$('#content').load( filePosition(XfileName), function(){
			$(this).children(':first').unwrap();               //'#content' within 'content' ==> need to unwrap
		});
		urlPosition = XfileName;
		if ( XfileName===linkID[0].fileName ) {
			$('#header .nav a').removeClass('active');
		} else{                                                //if there are the other type of links, it will be a problem. 
			$(XlinkID).addClass('active');
			$(XlinkID).siblings().removeClass('active');	
		};
		if (XpushHistory) {
			history.pushState(null, null, "#"+urlPosition );   //the third element define the linking URL
		};
	};

	/* setup click function for hyperlink */
	var clickLinkContent = function( XlinkID, XfileName ){
		$(XlinkID).click(function(){
			if( urlPosition != XfileName) {
				linkContent( XlinkID, XfileName, true );
			};
			return false;
		});
	};


	/*---------------------------------------------------------------------
	setup the click function for nav-hyperlink and setup initial page
	---------------------------------------------------------------------*/
	/* setup the initial page */
	linkContent( linkID[0].idName, linkID[0].fileName, true );

	/* click function for navbar-hyperlink */
	for (var i = 0; i <= navLinkNumber; i++) {
		clickLinkContent( linkID[i].idName, linkID[i].fileName );
	};


	/*---------------------------------------------------------------------
	Manipulating the browser history 
	---------------------------------------------------------------------*/
	window.addEventListener("popstate", function(){
		for (var i = 0; i <= navLinkNumber; i++) {
			if ( document.URL.slice(document.URL.lastIndexOf("#")+1) === linkID[i].fileName ) { 
				linkContent( linkID[i].idName, linkID[i].fileName, false );     //do not push history when user clicks the "backward" or "forward" in browser 
				break;
			};
		};
		return false;
	});


	/*---------------------------------------------------------------------
	setup function for #footerHome 
	---------------------------------------------------------------------*/
	var $footerHome = $(linkID[7].idName)

	/* scroll down and showup */
	$footerHome.css('opacity','0.35');
	$(window).scroll(function(){
		if ( $(document).scrollTop() >= $('#header').height() ) {
			$footerHome.animate({opacity:0.9},{duration:100,queue:false});
		} else{
			$footerHome.animate({opacity:0.35},{duration:100,queue:false});
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
			linkContent( linkID[7].idName, linkID[7].fileName, true );
		};
		return false;
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
