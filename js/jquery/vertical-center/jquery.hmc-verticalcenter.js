(function ( $ ) {

	/*
	Harmonic Vertical Center jQuery Plugin 
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/vertical-center
	
	Usage:
	
	$('section').hmcVerticalCenter();
	
	Options:
	{
		minWidth : ( optional | integer | default = 0 ) minimum window width to apply the vertical centering
		sameHeight : ( optional | boolean | default = false ) if set to true, all elements are set to the same height so that contents align appear vertically aligned when sitting side by side
	}
	
	To do:
	- adjust parent container width to match width set in CSS (if set)
	- do better job of cleanup when undoing formatting (return height to previously set value) 
	*/
	
	$.fn.hmcVerticalCenter = function(optionsPassed) {
		
		use strict;

		var target = $(this);
		
		// set initial parameters
		var options = {
			minWidth: 0,
			sameHeight : false
		};
			
		$.extend( options, optionsPassed );
		
		// recenter when window size changes
		$(window).resize(function(){
			target.hmcVCUpdate(options);
		});
		$(window).trigger('resize');
	}
			
	$.fn.hmcVCUpdate = function(options) {
		
		// make sure that window is wider than declared minimum width
		if ( window.outerWidth > options.minWidth ) {
		
			// figure out biggest height if heights are to match
			var biggestHeight = 0;
			if ( options.sameHeight ) {
				$(this).each(function(){
					if ( $(this).height() > biggestHeight ) {
						biggestHeight = $(this).height();
					}
				});
			};
			
			$(this).each(function(){
			
				// add centering wrappers if they haven't already been added
				if ( !$(this).hasClass('hmcVC') ) {
					$(this)
					.addClass('hmcVC')
					.wrapInner('<div class="hmcVC2" style="border-collapse:collapse;display:table;margin:0;padding:0;width:100%;"><div class="hmcVC3" style="display:table-cell;vertical-align:middle;"></div></div>');
				}
				
				// if sameHeight is true, set centering wrapper to biggest height, otherwise use container height
				var myHeight = options.sameHeight ? biggestHeight : $(this).height();
				$(this).children('.hmcVC2').height(myHeight);
				
			});
			
		} else {
			// if below minimus width, remove formatting
			$(this).find('.hmcVC3').contents().unwrap().unwrap();
		};
		
	}
	
}( jQuery ));