(function ( $ ) {

	/*
	Harmonic jQuery Mobile Refresh Widgets 
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/jqm-refresh
	
	Options:
	[array](options: "button", "header", "listview", "select")
	
	Usage:

	$("body").hmcJqmRefresh(['header','listview']);
	
	To do:
	* add other elements
	* refresh target element and not just elements within target element
	*/
	
	
	// reinitialize jQuery mobile widgets
	$.fn.hmcJqmRefresh = function( arr ) {
		var target = $(this);
		
		var button = true;
		var header = true;
		var listview = true;
		var select = true;
		
		if ( arr ) {
			button = false;
			header = false;
			listview = false;
			select = false;
			
			if ( $.inArray( 'button', arr ) != -1 ) {
				button = true
			}
			if ( $.inArray( 'header', arr ) != -1 ) {
				header = true;
			}
			if ( $.inArray( 'listview', arr ) != -1 ) {
				listview = true;
			}
			if ( $.inArray( 'select', arr ) != -1 ) {
				select = true;
			}
		}
		
		if ( button ) {
			target.find('[data-role="button"]').each( function() {
				if ( !$(this).hasClass('ui-btn') ) {
					$(this).addClass('ui-btn ui-input-btn ui-corner-all ui-shadow');
				}
			});
		}
		
		if ( listview ) target.find('[data-role="listview"]').listview('refresh');
		
		if ( select ) {
			if ( !target.hasClass('ui-select') && target.parents('.ui-select').length == 0 ) {
				target.filter('select').selectmenu().selectmenu('refresh');
			}
		}
		
		if ( header ) {
			target.find('[data-role="header"]').each( function() {
				if ( !$(this).hasClass('ui-header') ) {
					$(this).addClass('ui-header ui-bar-inherit');
				}
			});
		}
	}
}( jQuery ));