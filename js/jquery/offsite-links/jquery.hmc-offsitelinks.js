(function ( $ ) {

	/*
	Harmonic Offsite Links jQuery Plugin
	Version: 1.0.3
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/offsite-links

	Dependencies:
	 - jQuery (optimized for 10.2)

	Options:
	{
		site : ( optional | string | default = document.location.host ) string that identifies this site
	}

	Usage:
	$('body').hmcOffsiteLinks({
		site : "harmonicnw.com"
	});

	To do:
	 - Test document.location.host on live site
	*/

	$.fn.hmcOffsiteLinks = function( optionsPassed ) {

		// set initial parameters
		var options = {
			site: document.location.host,
		};

		$.extend( options, optionsPassed );

		$(this).find("a").each( function() {
			var myhref = $(this).attr("href");
			if( myhref && ( (myhref.indexOf( "http://" ) !== -1 || myhref.indexOf( "https://" ) !== -1) && myhref.indexOf( options.site ) === -1 ) ) {
				$(this).attr("target", "_blank");
			}
		});

		return $(this);
	};

}( jQuery ));
