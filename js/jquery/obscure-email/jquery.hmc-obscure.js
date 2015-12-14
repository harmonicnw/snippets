(function ( $ ) {

	'use strict';

	/*
	Harmonic Obscure Email jQuery Plugin
	Version: 1.2.2
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/obscure-email
	
	Options:
	{
		emailArray : ( required | array ) series of strings that compromise email address in reverse order
		text : ( optional | string | default = false, email if innerHTML is empty, otherwise keep innerHTML ) link text
		linkType : ( optional | "mailto" or "onclick" or "none" | default = "mailto" ) mailto sets link as mailto, onclick sets as a javascript onclick, anything else does not add a link
		textObj : (optional | jQuery collection | default = $(this) ) if set, applies text string to an object within the link object
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
			linkType: 'mailto',
			text: false,
			textObj: $()
		};
		
		$.extend( options, optionsPassed );
		
		// create email string
		var emailArray = options.emailArray.reverse();
		var email = emailArray.join('');
		
		// select textObj if not set
		if ( options.textObj.length === 0 ) {
			options.textObj = targets;
		}
		
		// add mailto links and link text
		$(this).each( function() {
			if ( options.linkType === 'mailto' ) {
				$(this).attr('href', 'mailto:' + email);	
			} else if ( options.linkType === 'onclick' ) {
				$(this).click( function(e) {
					window.location = 'mailto:' + email;
					e.preventDefault();
					$(this).blur();
				});
			}
			
			if ( options.text ) {
				options.textObj.html( options.text );	// if text option is set, set to text
			} else if ( options.textObj.html() === '' ) {
				options.textObj.text( email );	// if DOM object is empty, set to email
			}	// else don't touch.
		});
	};
		
}( jQuery ));

