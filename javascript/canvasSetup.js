$(document).ready(function(){

	/*---------------------------
	insert canvas items( first one is last one )
	-----------------------------*/
	for(var i = numberCanvas; i >= 1; i--) 
		$('.insertItemCanvas').append('<canvas id="' + IDcanvas(i) + '">' + itemNamePrefix + i + '</canvas>');


	/*---------------------------
	define the size of canvas equal to the size of last entryBox (unit: px)
	-----------------------------*/
	var sizeCanvas = Number();
	sizeCanvas = +$('#content .content_work_category .entryBox.last').css("height").toLowerCase().replace("px", "");


	/*---------------------------
	setup canvas (ref: http://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop)
	-----------------------------*/
	/* declare array of objects for canvas cropping image */
	var objArrayCanvas = new Array();
	for (var i = 1; i <= numberCanvas; i++) 
		objArrayCanvas.push( new Object() );
	/* start setup */
	for (var i = 1; i <= numberCanvas; i++) {
		objArrayCanvas[i]        = new Image();
		objArrayCanvas[i].index  = i;
		objArrayCanvas[i].onload = function() {
			var tempCanvas = document.getElementById( IDcanvas(this.index) );
			    tempCanvas.width  = sizeCanvas;
			    tempCanvas.height = sizeCanvas;
			/* draw cropped image */
			var reduceRatio  = 2.5;
			var sourceWidth  = this.width  / reduceRatio;
			var sourceHeight = this.height / reduceRatio;
			var sourceX = -(sourceWidth  - tempCanvas.width)/2;
			var sourceY = -(sourceHeight - tempCanvas.height)/2;
			tempCanvas.getContext('2d').drawImage(objArrayCanvas[this.index], sourceX, sourceY, sourceWidth, sourceHeight);
		}
		objArrayCanvas[i].src = itemPosition + itemNamePrefix + i + '.jpg';  //filePosition and fileName
	}


	/*---------------------------
	define function to show canvas
	-----------------------------*/
	var currentLightboxIndex = Number();   //which item displays now

	(function ( $ ) {
		$.fn.showCanvasItem = function(){

			/* DOM targets for jquery */
			var $DOMwrapper = $('.lightbox .lightboxWrapper');
			var $DOMimg     = $('.lightbox .lightboxWrapper img.itemImg');
			var $DOMtext    = $('.lightbox .lightboxWrapper div.itemText');

			/* hidden prev's item then start to change for UX */
			$DOMimg.css("display","none");
			$DOMtext.css("display","none");

			/* which item displays for lightbox */
			currentLightboxIndex = +this[0].id.slice( this[0].id.lastIndexOf("_")+1, this[0].id.length );
			var itemObj   = objArrayCanvas[currentLightboxIndex];        //canvas object

			/* dynamically change image size and css-style */
			var imgWidth    = Number();                       // image width  for lightbox
			var imgHeight   = Number();                       // image height for lightbox
			if ( itemObj.width > itemObj.height ) {
				imgWidth  = 35 * fontSizePx;                                    //define image size for .oneClolumn style
				imgHeight = imgWidth / itemObj.width * itemObj.height;
				$DOMimg.removeClass('twoColumn');
				$DOMwrapper.removeClass('twoColumn');
			} else{
				imgHeight = 30 * fontSizePx;                                    //define image size for .twoClolumn style
				imgWidth  = imgHeight / itemObj.height * itemObj.width;
				$DOMimg.addClass('twoColumn');
				$DOMwrapper.addClass('twoColumn');
			}
			$DOMimg.height( imgHeight );
			$DOMimg.width(  imgWidth  );
			$DOMimg[0].src = itemObj.src;         // image position

			/* insert item description for lightbox and change css-style for .itemtext */
			var responseLoad = String();    //loading content(useless here)
			var statusLoad   = String();    // .load success or not
			$DOMtext.load( itemObj.src.toLowerCase().replace("jpg","html"), function( responseLoad, statusLoad){
				if ( statusLoad === "success" ) {
					if ( itemObj.width > itemObj.height ) {
						$(this).children(':first').unwrap().removeClass('twoColumn');  // div within div: need to unwrap
					} else{
						$(this).children(':first').unwrap().addClass('twoColumn');
					}
				} else{
					$DOMtext.removeClass('twoColumn');
					$DOMtext[0].innerHTML = "";         // if loading error, it would be empty.
				}
			});

			/* ico_arrow display or not */
			if ( currentLightboxIndex===1 ) {
				$('.lightbox img.ico_arrow.left' ).removeClass("hidden");
				$('.lightbox img.ico_arrow.right').addClass("hidden");
			} else if( currentLightboxIndex>1 && currentLightboxIndex<numberCanvas ) {
				$('.lightbox img.ico_arrow.left' ).removeClass("hidden");
				$('.lightbox img.ico_arrow.right').removeClass("hidden");
			} else{
				$('.lightbox img.ico_arrow.left' ).addClass("hidden");
				$('.lightbox img.ico_arrow.right').removeClass("hidden");
			}

			/* item index in the lightbox */
			$(".lightbox p.itemIndex")[0].innerHTML = (numberCanvas-currentLightboxIndex+1) + "/" + numberCanvas;

			/* fadeIn item for UX */
			$DOMimg.fadeIn(125);
			$DOMtext.fadeIn(125);

			/*---end---*/
			return this;
		};
	}( jQuery ));


	/*---------------------------
	lightbox switch for each item
	-----------------------------*/
	for (var i = 1; i <= numberCanvas; i++) {
		$( '#' + IDcanvas(i) ).click(function(){
			/* show this item */
			$(this).showCanvasItem();
			/* lightbox turnOn */
			$('.lightboxBackground, .lightbox').fadeIn(125);
		});
	}
	/* lightbox turnOff */
	$('.lightboxBackground, .lightbox img.ico_cross').click(function(){
		var $DOMtext = $('.lightbox .lightboxWrapper div.itemText');
		$('.lightboxBackground, .lightbox').fadeOut(125, function(){
			/* for better UX */
			$DOMtext[0].innerHTML = "";
			$DOMtext.addClass('twoColumn');
		});
	});


	/*---------------------------
	lightbox ico_arrow function: next, prev
	-----------------------------*/
	/* .ico_arrow.right : next(backward to older) */
	$('.lightbox img.ico_arrow.right').click(function(){
		$('#' + IDcanvas(currentLightboxIndex-1)).showCanvasItem();
	});

	/* .ico_arrow.left : prev(forward to last item) */
	$('.lightbox img.ico_arrow.left').click(function(){
		$('#' + IDcanvas(currentLightboxIndex+1)).showCanvasItem();
	});


	/*---------------------------
	hover animation
	-----------------------------*/
	$("#content.content_work_category canvas").hover(function(){
		$(this).stop;
		$(this).animate({"border-radius":"2.125rem" },{duration:100,queue:false});
		return false;
	}, function(){
		$(this).animate({"border-radius":"0.5rem"},{duration:100,queue:false});
		return false;
	});


});