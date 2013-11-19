(function ( $ ) {

	/*
	Harmonic Obscure Email jQuery plugin
	Version: 1.1.0
	
	Options:
	{
		emailArray : ( required | array ) series of strings that compromise email address in reverse order
		text : ( optional | string | default = false, email if innerHTML is empty, otherwise keep innerHTML ) link text
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
			text: false
		}
		
		$.extend( options, optionsPassed );
		
		var emailArray = options.emailArray.reverse();
		var email = emailArray.join('');
		
		// add mailto links and link text
		$(this).each( function() {
			if ( options.mailto ) {
				$(this).attr('href', 'mailto:' + email);	
			}
			
			if ( options.text ) {
				$(this).html( options.text );	// if text option is set, set to text
			} else if ( $(this).text() == "" ) {
				$(this).text( email );	// if DOM object is empty, set to email
			}	// else don't touch.
		});
	}
	
}( jQuery ));

