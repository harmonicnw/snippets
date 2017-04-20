(function ( $ ) {

	/*
	Harmonic Address Links jQuery Plugin
	Version: 1.1.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/offsite-links

	Dependencies:
	 - jQuery (optimized for 1.12.4)

	Options: [none]

	Usage:
	$('body').hmcAddressLinks();
	*/

	$.fn.hmcAddressLinks = function() {
		var baseUrl;
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if (iOS) {
			baseUrl = 'https://maps.apple.com/?q=';
		} else {
			baseUrl = 'https://maps.google.com/maps?q=';
		}

		$(this).find("address").each( function() {
			$(this).wrapInner("<a href='" + baseUrl + encodeURIComponent( $(this).text() ) + "' target='_blank'></a>");
		});

		return $(this);
	};

}( jQuery ));
