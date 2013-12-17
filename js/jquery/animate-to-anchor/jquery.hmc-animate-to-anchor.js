(function ( $ ) {

	/*
	Harmonic Animate to Anchor jQuery pluggin 
	Version: 1.0.1
	
	Options:
	{
		bufferTop : ( optional | integer | default = 0 ) identifies the top buffer for pages that have a sticky header. 

	}
	
	Usage:

	$("nav").hmcAnimateToAnchor( {bufferTop : 40} );
	
	To do:
	*/
	
	// initialize animated scroll to in-page anchor link
	$.fn.hmcAnimateToAnchor = function( optionsPassed ) {
		
		// set initial parameters
		var options = {
			bufferTop : 0
		}
		
		$.extend( options, optionsPassed );
		
		// find all anchor tags with hashtag links
		$(this).find('a[href^=#]').each( function() {
			var target = $( $(this).attr('href') );
			
			if (target.length > 0) {
				$(this).click( function(e) {
					var targetOffset = target.offset();
						var scrollTo = targetOffset.top + options.bufferTop;
					
					$('body,html').animate({
						'scrollTop' : scrollTo + 'px'
					}, 1000);
					
					e.preventDefault();
					$(this).blur();
				});
			}
		});
	}
	
}( jQuery ));

