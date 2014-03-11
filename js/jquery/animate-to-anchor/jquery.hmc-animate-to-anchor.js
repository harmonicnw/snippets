(function ( $ ) {

	/*
	Harmonic Animate to Anchor jQuery Plugin 
	Version: 1.0.2
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/animate-to-anchor
	
	Options:
	{
		bufferTop : ( optional | integer | default = 0 ) identifies the top buffer for pages that have a sticky header. 
		bufferTopMobile : (optional | integer | default = 0) sets the buffer for mobile devices.
		breakpoint: (optional | integer | deafault = 768) sets the breakpoint for mobile devices (in pixels)

	}
	
	Usage:

	$("nav").hmcAnimateToAnchor( {bufferTop : -40, bufferTopMobile : -10, breakpoint : 992} );
	
	To do:
	*/
	
	// initialize animated scroll to in-page anchor link
	$.fn.hmcAnimateToAnchor = function( optionsPassed ) {

		// set initial parameters
		var options = {
			bufferTop : 0,
			bufferTopMobile: 0,
			breakpoint : 768, 
		}

		$.extend( options, optionsPassed );

		// find all anchor tags with hashtag links
		$(this).find('a[href^=#]').each( function() {
			var target = $( $(this).attr('href') );

			if (target.length > 0) {
				$(this).click( function(e) {
					var targetOffset = target.offset();
					if (window.outerWidth >= options.breakpoint){
						var scrollTo = targetOffset.top + options.bufferTop;
					} 
					else {
						var scrollTo = targetOffset.top + options.bufferTopMobile;
					}

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

