(function ( $ ) {
	/*
	Harmonic Remove Telephone Links jQuery Plugin
	Version: 1.0.2
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/remove-tel
	
	Dependencies:
	 - jQuery (optimized for 10.2)
	
	Options:
	{
		breakpoint : ( optional | string | default = 480 ) string that identifies the screen size breakpoint for devices that are unlikely to have telephone functionality.
	}
	
	Usage:
		$("body").hmcRemoveTel({
			breakpoint: "screensize"
		});
	
	To do:
		-Add functionality to detect if device has telephone functionality as opposed to detecting screen size.
	*/
	$.fn.hmcRemoveTel = function( optionsPassed ) {
		
		var options = {
			breakpoint: 480
		}
		
		$.extend( options, optionsPassed );
		
		if($(window).width()>options.breakpoint){
			$(this).find("a").each(function(){
				var href = $(this).attr("href");
				if( href && href.indexOf("tel:") !=-1 ) {
					$(this).contents().unwrap();	
				}	
			});
		}
		
		return $(this);
	}
}( jQuery ));