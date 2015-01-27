(function ( $ ) {

	/*
	Harmonic Add Fors jQuery Plugin 
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/add-fors
	
	Options:
	{
		rowNodeName : ( optional | HTML DOM node name | default = "li" ) identifies container for a label/input group
		contactFormSeven : ( optional | boolean | default = false ) is this a Contact Form 7 WordPress plugin form?
	}
	
	Usage:

	$('form').addFor({ contactFormSeven: true });
	
	To do:
	*/
	
	$.fn.addFors = function( optionsPassed ) {
		
		// set initial parameters
		var options = {
			rowNodeName : "li",
			contactFormSeven : false
		}

		$.extend( options, optionsPassed );
		
		var container = $(this);
		var fieldArr = ["input", "select", "textarea"];
		var counter = 0;
		
		// if we're in a contact form 7 form, add labels to checkboxes
		if ( options.contactFormSeven ) {
			$(".wpcf7-list-item-label").wrapInner('<label></label>');
		}
		
		// iterate over form rows to find label/field pairs
		container.find( options.rowNodeName ).each( function() {
			var row = $(this);
			var label = $(this).find('label');
			var field = row.find( fieldArr.join(",") );
			
			// if there is a label, go
			if ( ( label.length > 0 && !label.attr('for') )  ) {
				
				// if there is only one field, add that field's ID as for attribute on label
				if ( field.length == 1 ) {
					var forId;
					field = field.first();
					
					if ( field.attr('id') ) {
						forId = field.attr('id');
					} else {
						forId = "add-for-field-" + counter++;
						field.attr('id', forId);
					}
					label.attr('for', forId);
				
				// ...or in the case of checkboxes or radio buttons
				} if ( field.length > 1 ) {
					var booleanFields = field.filter(':radio, :checkbox');
					console.log( "booleanFields length = " + booleanFields.length + ", label length = " + label.length );
					if ( booleanFields.length == label.length ) {
						console.log('eqs');
						var forId;
						
						booleanFields.each( function(i) {
							if ( $(this).attr('id') ) {
								forId = $(this).attr('id');
							} else {
								forId = "add-for-field-" + counter++;
								$(this).attr('id', forId);
							}
							label.eq(i).attr('for', forId);
						});
					}
				}
			}
		});
	}


}( jQuery ));