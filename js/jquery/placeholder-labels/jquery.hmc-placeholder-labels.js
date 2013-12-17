(function ( $ ) {

	/*
	Harmonic Offsite Links jQuery plugin
	Version: 1.0.0
	
	Dependencies:
	 - jQuery (optimized for 10.2)
	
	Usage:
	$("#commentform").initFormDynamicDefaultValues();
	
	To do:
	*/
	
	// initialize form to show/hide default value on focus/blur
	$.fn.initFormDynamicDefaultValues = function() {
		var formTextFields = $(this).find("input[type=text], textarea");
	
		// clear text fields on focus, return to default val on blur
		formTextFields.each( function() {
			var defaultValue = $(this).get(0).getAttribute('value');
			
			$(this).blur( function() {
				if ( $(this).val() == "" ) {
					$(this).val( defaultValue );
				}
			});
			$(this).focus( function() {
				if ( $(this).val() == defaultValue ) {
					$(this).val( "" );
				}
			});
		});
	}
		
}( jQuery ));

