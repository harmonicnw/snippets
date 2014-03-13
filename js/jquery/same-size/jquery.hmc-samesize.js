(function ( $ ) {

	/*
	Harmonic Same Sizer jQuery plugin
	Version: 1.0.1
	
	Options:
	{
		height : ( optional | boolean | default = true ) if true, heights will be set to match
		images : ( optional | boolean | default = false ) if true, widths will be set to match
		windowMinWidth : ( optional | number | default = 0 ) will only run resizer if window is at or over n pixels wide
		windowMaxWidth : ( optional | number | default = 99999 ) will only run resizer if window is under n pixels wide 
	}
	
	Usage:
	$('.some .columns').hmcSameSize();
	
	To do:
	 - check for preset heights and widths directly on DOM objs, save into object data, use for resetting original height and width when over/under windowMinWidth/windowMaxWidth
	 - add option to hide objects until script has run (along with some animation options like fade speed, easing, etc.)
	 - add option to ensure that imgs within DOM object have loaded
	*/
	
	$.fn.hmcSameSize = function( optionsPassed ) {
		var targets = $(this);

		// set initial parameters
		var options = {
			height : true,
			width : false,
			windowMinWidth : 0,
			windowMaxWidth : 9999
		}
		
		$.extend( options, optionsPassed );
		
		$(window).resize( function() {
			targets.hmcSSGo( options );
		});
		
		targets.hmcSSGo( options );
	}
	
	$.fn.hmcSSGo = function( options ) {
		$(this).css('min-height','').css('min-width','');
		// if window is within min/max width, resize objects, otherwise set to auto
		if ( window.outerWidth >= options.windowMinWidth && window.outerWidth < options.windowMaxWidth ) {
			console.log("You resized the screen!!");
			var biggestHeight = 0;
			var biggestWidth = 0;
			
			// cycle through objects to find biggest heights and widths
			$(this).each( function() {
				if ( $(this).height() > biggestHeight ) {
					biggestHeight = $(this).height();
				}
				if ( $(this).width() > biggestWidth ) {
					biggestWidth = $(this).width();
				}
			});
			
			// set height and width of objects
			if ( options.height ) {
				$(this).css("min-height", biggestHeight + "px");
			}
			if ( options.width ) {
				$(this).width("min-width", biggestWidth + "px");
			}	
		}	
	}

}( jQuery ));