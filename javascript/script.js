
/*---------------------------------------------------------------------
define global parameters & input the information of file
---------------------------------------------------------------------*/
var filePosition = "./content";                 //fold for content html
var currentState = { fromID:"", fileName:""};   //saved information of current page for pushState. fileName will use for URL.

var fontSizePx = Number();                      //for translate px-rem(unit: px)
$(document).ready(function(){
	fontSizePx = +$('html').css("font-size").toLocaleLowerCase().replace("px", "");
});

/* input information of links */
var linkID = [
    /*----------------------------- nav ------------------------------*/
    { idName:'#link_content_home',            fileName: "home"        },   // linkID[0] : homepage
    { idName:'#link_content_news',            fileName: "news"        },
    { idName:'#link_content_profile',         fileName: "profile"     },
    { idName:'#link_content_work',            fileName: "work"        },
    { idName:'#link_content_lesson',          fileName: "lesson"      },
    { idName:'#link_content_blog',            fileName: "blog"        },
    { idName:'#link_content_contact',         fileName: "contact"     },
    /*--------------------------- footer -----------------------------*/
    { idName:'#link_content_home_footerHome', fileName: "home"        },
    /*---------------------------- work ------------------------------*/
    { idName:'#link_content_work_macaron',    fileName: "work_macaron"}
];

linkID.headNav        = 0;           //head of links in the navbar
linkID.headFooterHome = 7;           //head of links in the #footerHome
linkID.headWork       = 8;           //head of links in the .content_work

linkID.numberNav        = 7;         //number of links in the navbar
linkID.numberFooterHome = 1;         //number of links in the #footerHome
linkID.numberWork       = 1;         //number of links in the .content_work


/*---------------------------------------------------------------------
define jquery functions for hyperlink
---------------------------------------------------------------------*/
(function ( $ ) {

	/* link to the content html, adds 'active' class and pushing the browser history */
	$.fn.linkContent = function( XlinkID, XfilePosition, XfileName, XpushHistory ) {
		/* record page-information */
		currentState = { fromID:XlinkID, fileName:XfileName};
		/* load content from external file */
		$('#content').load( XfilePosition + "/"+ XfileName + ".html", function(){
			/* '#content' within 'content' ==> need to unwrap */
			$(this).children(':first').unwrap();
			/* '#content' fadein effect */
			$('body').find('#content').css('display','none');
			$('body').find('#content').fadeIn(125);
		});
		/* hightlight the navbar link */
		if ( XfileName===linkID[0].fileName ) {
			$('#header .nav a').removeClass('active');
		} else{                                                //add hightlight the link with .active
			$(XlinkID).addClass('active');
			$(XlinkID).siblings().removeClass('active');	
		};
		/* push the page history */
		if (XpushHistory) {
			if ( XfileName===linkID[0].fileName ) {
				history.pushState(currentState, null, "./" );             //when it link to the homepage, it doesn't change the URL.
			} else{
				history.pushState(currentState, null, "./#"+XfileName );   //the third element define the linking URL: it must use prefix "#" or "?". Some problem (browser reload) will occur when it doesn't have prefix...
			};
		};
		return this;
	};

	/* setup click function for hyperlink */
	$.fn.clickLinkContent = function( XlinkID, XfilePosition, XfileName ) {
		$(XlinkID).click(function(){
			if( currentState.fileName != XfileName) {
				$().linkContent( XlinkID, XfilePosition, XfileName, true );
			};
			return false;
		});
		return this;
	};

}( jQuery ));



/*---------------------------------------------------------------------
initial setup using jquery
---------------------------------------------------------------------*/
$(document).ready(function(){

	/*---------------------------------------------------------------------
	setup initial page and the click function for nav-hyperlink
	---------------------------------------------------------------------*/
	/* setup the initial page */
	var checkInitialHome = true;
	for (var i = 0; i < linkID.length; i++) {
		if ( document.URL.slice(document.URL.lastIndexOf("#")+1) === linkID[i].fileName ) {   //check input URL point to content or not
			$().linkContent( linkID[i].idName, filePosition, linkID[i].fileName, false );
			history.replaceState(currentState, null, "./#"+currentState.fileName );             //replaceState for initialized
			checkInitialHome = false;
			break;
		};
	};
	if ( checkInitialHome ) {
		$().linkContent( linkID[0].idName, filePosition, linkID[0].fileName, false );
		history.replaceState(currentState, null, "./" );      //replaceState for initialized. when it link to the homepage, it doesn't change the URL.
	};

	/* click function for navbar-hyperlink */
	for (var i = linkID.headNav; i < linkID.headNav+linkID.numberNav; i++) {
		$().clickLinkContent( linkID[i].idName, filePosition, linkID[i].fileName );
	};


	/*---------------------------------------------------------------------
	Manipulating the browser history 
	---------------------------------------------------------------------*/
	window.addEventListener("popstate", function(){
		currentState = history.state;
		$().linkContent( currentState.fromID, filePosition, currentState.fileName, false );     //do not push history when user clicks the "backward" or "forward" in browser 
		return false;
	});


	/*---------------------------------------------------------------------
	setup function for #footerHome 
	---------------------------------------------------------------------*/
	var $footerHome = $(linkID[linkID.headFooterHome].idName)

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
		if ( $(document).scrollTop() < $('#header').height() && (currentState.fileName!==linkID[linkID.headFooterHome].fileName) ) {
			$().linkContent( linkID[linkID.headFooterHome].idName, filePosition, linkID[linkID.headFooterHome].fileName, true );
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
		"./images/cover.jpg",
        "./images/profile.jpg",
        "./images/contact.jpg",
        "./images/line.png",
        "./images/ico_home.png",
        "./images/ico_mail.png",
        "./images/ico_facebook.png",

        "./images/work/title_macaron.jpg",
        "./images/work/title_tarte.jpg",
        "./images/work/title_quiche.jpg",
        "./images/work/title_cake.jpg",
        "./images/work/title_soft.jpg",
        "./images/work/title_jam.jpg"
    );


});
