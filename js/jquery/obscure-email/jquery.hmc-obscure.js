(function ( $ ) {

	/*
	Harmonic Obscure Email jQuery plugin
	Version: 1.0.0
	
	Dependencies:
	 - jQuery (optimized for 10.2)
	
	Options:
	{
		emailArray : ( required | array ) series of strings that compromise email address in reverse order
		text : ( optional | string or boolean | default = email address ) if set as a string, text to display within element. if set as boolean, true = set to email address, false = do not modify text in object
		mailto : ( optional | boolean | default = true ) if true, add mailto link to object href property
	}
	
	Usage:
	$('a.email-link').hmcObscureEmail({
		emailArray : [
			'l.com',
			's@myemai',
			'my_addres'
		]
	});
	
	To do:
	 - add option for including email address into text like "Send email to %email% now!"
	 - add options for subject and body strings
	*/
	
	$.fn.hmcObscureEmail = function( optionsPassed ) {
		var targets = $(this);

		// set initial parameters
		var options = {
			mailto: true,
			text: true
		}
		
		$.extend( options, optionsPassed );
		
		var emailArray = options.emailArray.reverse();
		var email = emailArray.join('');
		
		// set display text to email address if options.text == true (default)
		if ( options.text === true ) {
			options.text = email;
		}
		
		// add mailto links and link text
		$(this).each( function() {
			if ( options.mailto ) {
				$(this).attr('href', 'mailto:' + email);	
			}
			if ( options.text ) {
				$(this).html( options.text );	
			}
		});
	}


}( jQuery ));

