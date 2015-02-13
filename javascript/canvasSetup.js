$(document).ready(function(){

	/*---------------------------
	insert canvas items
	-----------------------------*/
	for(var i = 1; i <= numberCanvas; i++) {
		$('.insertItemCanvas').append('<canvas id="' + IDcanvas(i) + '">' + itemNamePrefix + i + '</canvas>');
	};


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
	for (var i = 1; i <= numberCanvas; i++) objArrayCanvas.push( new Object() );
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
		};
		objArrayCanvas[i].src = itemPosition + itemNamePrefix + i + '.jpg';  //filePosition and fileName
	};


	/*---------------------------
	lightbox switch for each item
	-----------------------------*/
	for (var i = 1; i <= numberCanvas; i++) {
		$( '#' + IDcanvas(i) ).click(function(){

			/* DOM targets for jquery */
			var $DOMwrapper  = $('.lightbox .lightboxWrapper');
			var $DOMimg      = $('.lightbox .lightboxWrapper img.itemImg');
			var $DOMtext     = $('.lightbox .lightboxWrapper div.itemText');

			/* insert image for lightbox */
			var imgFileName  = itemNamePrefix + this.id.slice( this.id.lastIndexOf("_")+1, this.id.length );
			$DOMimg[0].src= itemPosition + imgFileName + ".jpg";         // input file position

			/* insert item description for lightbox and change css-style for .itemtext */
			var responseLoad = String();    //loading content(useless here)
			var statusLoad   = String();    // .load success or not
			$DOMtext.load( itemPosition + imgFileName + ".html", function( responseLoad, statusLoad){
				if ( statusLoad === "success" ) {
					if ( $DOMimg[0].width > $DOMimg[0].height ) {
						$(this).children(':first').unwrap().removeClass('twoColumn').addClass('oneColumn');  // div within div: need to unwrap
					} else{
						$(this).children(':first').unwrap().removeClass('oneColumn').addClass('twoColumn');
					};
				} else{
					$DOMtext[0].innerHTML = "";         // if loading error, it would be empty.
				};
			});

			/* dynamically change image size and css-style */
			var imgWidth    = Number();                       // image width  for lightbox
			var imgHeight   = Number();                       // image height for lightbox
			if ( $DOMimg[0].width > $DOMimg[0].height ) {
				imgWidth  = 35 * fontSizePx;                                    //define image size for .oneClolumn style
				imgHeight = imgWidth / $DOMimg[0].width * $DOMimg[0].height;
				$DOMimg.removeClass('twoColumn').addClass('oneColumn');
				$DOMwrapper.removeClass('twoColumn').addClass('oneColumn');
			} else{
				imgHeight = 30 * fontSizePx;                                    //define image size for .twoClolumn style
				imgWidth  = imgHeight / $DOMimg[0].height * $DOMimg[0].width;
				$DOMimg.removeClass('oneColumn').addClass('twoColumn');
				$DOMwrapper.removeClass('oneColumn').addClass('twoColumn');
			};
			$DOMimg.height( imgHeight );
			$DOMimg.width(  imgWidth  );

			/* lightbox turnOn */
			$('.lightboxBackground, .lightbox').fadeIn(150);
		});
	};
	/* lightbox turnOff */
	$('.lightboxBackground').click(function(){
		$('.lightboxBackground, .lightbox').fadeOut(150);
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