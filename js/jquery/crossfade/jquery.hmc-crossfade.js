(function ( $ ) {

	'use strict';

	/*
	Harmonic Cross Fader jQuery plugin
	Version: 1.2
	
	Options:
	{
		delay : ( optional | number | default = 7000 ) number of milliseconds between slides
		animationSpeed : ( optional | number | default = 500 ) number of milliseconds of fade
		domElement: ( optional | string | default = 'li') selector for target element to look for within scoped object
	}
	
	Usage:
	$('ul.slides').hmcCrossfade({
		delay: 3000,
		animationSpeed: 500
	});
	
	To do:
	 - add additional effects (like slide up/down/left/right)
	*/

	$.fn.hmcCrossfade = function( optionsPassed ) {
		// set initial parameters
		var options = {
			delay: 7000,
			animationSpeed: 500,
			domElement: 'li'
		};
		
		$.extend( options, optionsPassed );

		// select slides
		var slides = $(this).find( options.domElement );

		// if there are less than two slides, stop
		if ( slides.length < 2 ) {
			return false;
		}

		// make sure we have the proper CSS properties
		slides.css({
			position: 'absolute',
			'z-index': 0
		});

		slides.hide();
		slides.first().show();

		var cfInt = setInterval( function() {
			var currIndex = 0;
			
			slides.each( function(i) {
				if ( $(this).is(':visible') ) {
					currIndex = i;
				}
			});

			var nextIndex = (currIndex + 1) % slides.length;

			var currSlide = slides.eq(currIndex);
			var nextSlide = slides.eq(nextIndex);


			// fade in next slide over current slide, then hide current slide
			currSlide.css({
				'z-index': 0
			});
			nextSlide.css({
				'z-index': 1
			});
			nextSlide.fadeIn( function() {
				currSlide.hide();
				nextSlide.css({
					'z-index': 0
				})
			});

		}, options.delay);
	};

}( jQuery ));