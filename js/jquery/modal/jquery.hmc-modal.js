(function ( $ ) {

	/*
	Harmonic Responsive Modal jQuery Plugin 
	Version: 1.0.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/modal
	
	This plugin creates a modal window element that can be opened, closed and automatically centers in the browser window.
	
	Options:
	{
		overlay : ( required | jQuery object | default = default ) set the screen overlay object that sits behind the modal window,
		openers : ( option | jQuery object | default = false ) jQuery collection of DOM objects that when clicked open the modal,
		closers : ( option | jQuery object | default = false ) jQuery collection of DOM objects that when clicked close the modal
	}
	
	Usage:
	$('#modal1').hmcModal({
		overlay: $('#semiOpaqueBackground'),
		openers: $('.launchModalWhenClicked')
	});
	*/
	$.fn.hmcModal = function( optionsPassed ) {
		// set initial parameters
		var options = {
			closers : false,
			overlay : 'default',
			openers : false
		};
		
		$.extend( options, optionsPassed );
		
		// create overlay if not set
		if ( options.overlay == 'default' ) {
			options.overlay = $( '<div id="modalOverlay" class="modalOverlay" />' );
			$('body').append( options.overlay );
		}
		
		var modal = $(this);
		
		// make opener objects open modal window
		if (options.openers) {
			options.openers.each( function() {
				$(this).click( function(e) {
					modal.hmcShowModal( options );
					e.preventDefault();
				});
			});
		}
		
		// make closer objects close modal window
		if (options.closers) {
			options.closers.each( function() {
				$(this).click( function(e) {
					modal.hmcHideModal( options );
					e.preventDefault();
				});
			});
		}
		
		// update modal sizing when window size/scroll has changed
		$(window).resize( function() {
			if ( options.overlay ) {
				options.overlay.hmcFitToWindow();	
			}
			modal.filter(':visible').hmcCenterInWindow();
		});
		$(window).scroll( function() {
			modal.filter(':visible').hmcCenterInWindow();
		});
	};
	
	// center modal in browser window
	$.fn.hmcCenterInWindow = function() {
		$(this).hide();
		$(this).css('left', Math.round( $(document).scrollLeft() + ( ( $(window).width() - $(this).outerWidth(true) ) / 2) )  + 'px');
		$(this).css('top', Math.round( $(document).scrollTop() + ( ( $(window).height() - $(this).outerHeight(true) ) / 2) )  + 'px');
		$(this).show();
	};
	
	// fit overlay over browser window
	$.fn.hmcFitToWindow = function() {
		$(this).hide();
		$(this).css('width', Math.round( $(document).width() ) + 'px');
		$(this).css('height', Math.round( $(document).height() ) + 'px');
		$(this).show();
	};
	
	// shows targeted modal
	$.fn.hmcShowModal = function( options ) {
		if ( options.overlay ) {
			options.overlay.hmcFitToWindow();	
		}
		$(this).hmcCenterInWindow();
	};
	
	// hides targeted modal
	$.fn.hmcHideModal = function( options ) {
		$(this).hide();
		if (options.overlay) {
			options.overlay.hide();
		}
	};
	
}( jQuery ));