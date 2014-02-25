(function ( $ ) {

	/*
	Harmonic Background Parallax jQuery pluggin 
	Version: 1.0.0
	
	Options:
	{
		scRate : ( optional | integer | default = 0.3 ) identifies the scroll rate for the parallaxed background image, must be an integer between 0 and 1. 
	}
	
	Usage:

	$('.parallax').hmcParallax({scRate: 0.5});
	
	Notes: 
	
	All parallaxed background images must have a background-attachement of fixed.
	
	To do:
	-Add reverese parallax
	-Add option for horizontal parallax
	-Fix bug where images can scroll beyond the height of their parent div.  
	*/
	
	$.fn.hmcParallax = function(optionsPassed) {
		
		// set initial parameters
		var options = {
			scRate : 0.3, 
		};
		
		$.extend( options, optionsPassed );
		
		var scrolled = $(window).scrollTop()
		$(this).each(function(){
			var scrollBuffer = $(this).offset();
			var parallaxScroll = -(scrolled - scrollBuffer.top) * options.scRate;
			$(this).css('background-position-y', parallaxScroll + 'px');
		})
	};
	
}( jQuery ));

