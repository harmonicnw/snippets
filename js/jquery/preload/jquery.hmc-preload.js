(function ( $ ) {

	/*
	Harmonic Pre-loader jQuery Plugin
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/preload
	
	Dependencies:
	 - jQuery (optimized for 10.2)
	
	Options:
	{
		images: ( required | arr  ) an array of image sources to be preloaded
	}
	
	Usage:
	$('body').hmcPreload({
		images : [
		'http://www.awesomestuff.com/coolman.png',
		'http://www.dinostuff.com/trex.jpeg',
		'http://www.lordoftheringstrivia.com/onering.jpeg'
		]
	});
	
	To do:
	 - 
	*/

	// preload images

	$.fn.hmcPreload = function( optionsPassed ) {
		var options = {
			images: []
		}
		
		$.extend( options, optionsPassed );
		
		if ( $("#preloadImages").length <= 0 ) {
			$(this).append("<div id='preloadImages' style='display:none' />");
		}
		
		var p = $("#preloadImages");
		
		for (var i = 0; i < options.images.length; i++) {
			p.append( "<img src='" + options.images[i] + "' />" );
		}
	}

} ( jQuery ));
