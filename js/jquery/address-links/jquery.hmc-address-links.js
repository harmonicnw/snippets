(function ( $ ) {

	/*
	Harmonic Address Links jQuery Plugin
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/offsite-links

	Dependencies:
	 - jQuery (optimized for 1.12.4)

	Options: [none]

	Usage:
	$('body').hmcAddressLinks();

	To do:
	 - Add device test to link to apple maps on iOS
	*/

	$.fn.hmcAddressLinks = function() {

		$(this).find("address").each( function() {
			$(this).wrapInner("<a href='http://maps.google.com/maps?q=" + encodeURIComponent( $(this).text() ) + "' target='_blank'></a>");
		});

		return $(this);
	};

}( jQuery ));
