(function ( $ ) {

	/*
	Harmonic Offsite Links jQuery Plugin
	Version: 1.0.5
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/offsite-links
	Dependencies:
	 - jQuery (optimized for 10.2)
	Options:
	{
		site : ( optional | string | default = document.location.host ) string that identifies this site
		noopener : ( optional | boolean | default = true) adds rel="noopener" to external links
	}
	Usage:
	$('body').hmcOffsiteLinks();
	*/

	$.fn.hmcOffsiteLinks = function( optionsPassed ) {

		// set initial parameters
		var options = {
			site: document.location.host,
			noopener: true,
		};

		$.extend( options, optionsPassed );

		$(this).find("a").each( function() {
			var myhref = $(this).attr("href");
			if( myhref && ( (myhref.indexOf( "http://" ) !== -1 || myhref.indexOf( "https://" ) !== -1) && myhref.indexOf( options.site ) === -1 ) ) {
				$(this).attr("target", "_blank");
				if (options.noopener) {
        	$(this).attr("rel", "noopener");
				}
			}
		});

		return $(this);
	};

}( jQuery ));
