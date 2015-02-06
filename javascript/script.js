$(document).ready(function(){

	/*---------------------------------------------------------------------
	define global parameters & input the information of file
	---------------------------------------------------------------------*/
	var folderName   = "content";                   //fold for content html
	var currentState = { idName:"", fileName:""};   //saved information of current page. fileName will use for URL.

	var navLinkNumber = 6;                          //number of links in the navbar
	var linkID = [                                  //information of link
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
		/* record page-information */
		currentState = { idName:XlinkID, fileName:XfileName};
		/* load content from external file */
		$('#content').load( filePosition(XfileName), function(){
			$(this).children(':first').unwrap();               //'#content' within 'content' ==> need to unwrap
		});
		/* hightlight the navbar link */
		if ( XfileName===linkID[0].fileName ) {
			$('#header .nav a').removeClass('active');
		} else{                                                //if there are the other type of links, it will be a problem. 
			$(XlinkID).addClass('active');
			$(XlinkID).siblings().removeClass('active');	
		};
		/* push the page history */
		if (XpushHistory) {
			history.pushState(currentState, null, "#"+XfileName );   //the third element define the linking URL: it must use prefix "#" or "?". Some problem will occur when it doesn't have prefix...
		};
	};

	/* setup click function for hyperlink */
	var clickLinkContent = function( XlinkID, XfileName ){
		$(XlinkID).click(function(){
			if( currentState.fileName != XfileName) {
				linkContent( XlinkID, XfileName, true );
			};
			return false;
		});
	};


	/*---------------------------------------------------------------------
	setup the click function for nav-hyperlink and setup initial page
	---------------------------------------------------------------------*/
	/* setup the initial page */
	var checkInitialHome = true;
	for (var i = 0; i <= navLinkNumber; i++) {
		if ( document.URL.slice(document.URL.lastIndexOf("#")+1) === linkID[i].fileName ) {   //check input URL point to content or not
			linkContent( linkID[i].idName, linkID[i].fileName, true );
			checkInitialHome = false;
			break;
		};
	};
	if ( checkInitialHome ) linkContent( linkID[0].idName, linkID[0].fileName, true );

	/* click function for navbar-hyperlink */
	for (var i = 0; i <= navLinkNumber; i++) {
		clickLinkContent( linkID[i].idName, linkID[i].fileName );
	};


	/*---------------------------------------------------------------------
	Manipulating the browser history 
	---------------------------------------------------------------------*/
	window.addEventListener("popstate", function(){
		currentState = history.state;
		linkContent( currentState.idName, currentState.fileName, false );     //do not push history when user clicks the "backward" or "forward" in browser 
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
        "./images/line.png",
        "./images/profile.jpg",
        "./images/contact.jpg",
        "./images/ico_mail.png",
        "./images/ico_facebook.png"
    );


});
