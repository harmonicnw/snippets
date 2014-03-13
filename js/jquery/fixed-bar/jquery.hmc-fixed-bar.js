(function ( $ ) {

	/*
	Harmonic Fixed Bar jQuery Plugin 
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/fixed-bar
	
	Options:
	{
		top : ( optional | integer | default = 0 ) determines top sticky point in pixels 
		minWindowWidth : ( optional | integer | default = 768 ) determines minimum window width in pixels to initiate stickiness
		zIndex : ( optional | integer | default = 1 ) sets z-index of floated element
	}
	
	Usage:

	$('.fixedbar').hmcFixedBar({
		top : 65,
		zIndex : 9999
	});
	*/
	
	// initialize animated scroll to in-page anchor link
	$.fn.hmcFixedBar = function( optionsPassed ) {
		
		// set initial parameters
		var options = {
			top : 0,
			minWindowWidth : 768,
			zIndex : 1
		}
		
		$.extend( options, optionsPassed );
		
		var floatbar = $(this);
		var subnavHeight = $(this).outerHeight();
		
		// initialize stickiness
		var subnavPosition = floatbar.position();
		var subnavPositionTop = Math.round( subnavPosition.top );
		
		// make filter bar "sticky" if not mobile
		var dummyElement = $("<div style='display:none' class='dummyFilter' />");
		floatbar.before( dummyElement );
		
		// filter doesn't stick unless window is full screen width and scrolled down far enough
		$(window).scroll( function() {		
			if ( $(window).width() > options.minWindowWidth && $(window).scrollTop() > ( subnavPositionTop - options.top ) ) {
				floatbar.css({
					'position': 'fixed',
					'top': options.top + 'px',
					'z-index': options.zIndex
				});
				dummyElement.height( subnavHeight ).show();
			} else {
				dummyElement.hide();
				floatbar.css({
					'position': 'relative',
					'top': 'auto',
					'z-index': '0'
				});
			}
		});
		
		// force scroll initially in case page loads with scrolling set
		$(window).scrollTop( $(window).scrollTop() - 1 );
	}

}( jQuery ));