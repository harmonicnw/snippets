(function ( $ ) {

	/*
	Harmonic Responsive Modal jQuery Plugin 
	Version: 1.0.4
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/modal
	
	Creates a responsive modal window.
	
	Options:
	{
		overlay : ( required | jQuery object | default = default ) set the screen overlay object that sits behind the modal window,
		openers : ( optional | jQuery object | default = false ) jQuery collection of DOM objects that when clicked open the modal,
		closers : ( optional | jQuery object | default = false ) jQuery collection of DOM objects that when clicked close the modal,
		alwaysOn : ( option | jQuery object | default = false ) if true, the modal will always be on,
		breakpoint: ( optional | number | default = false ) if set, the modal will switch to mobile mode (fullscreen) when screen width is below set value,
		modalDelay: ( optional | number | default = 0 ) number of milliseconds to delay loading modal (but not overlay),
		fixed: ( optional | boolean | default = false ) if true, modal uses fixed positioning,
		windowMargin: (optional | object | default = false ) set margins for margin distance from edges of the window. can be set with or without breakpoints:
		{
        	top: 0,
        	right: 0,
        	bottom: 0,
        	left: 0
        }
        or
        {
        	top: [ default, above-first-breakpoint ],
        	right: [ default, above-first-breakpoint ],
        	bottom: [ default, above-first-breakpoint ],
        	left: [ default, above-first-breakpoint ]
        }
	}
	
	Usage:
	$('#modal1').hmcModal({
		overlay: $('#semiOpaqueBackground'),
		openers: $('.launchModalWhenClicked')
	});
	
	To-do:
	 - window margin: implement left/bottom/right
	 - window margin: actual usable defaults
	 - window margin: implementation for no breakpoint
	 
	*/
	$.fn.hmcModal = function( optionsPassed ) {
		// set initial parameters
		var options = {
			closers : false,
			overlay : 'default',
			openers : false,
			alwaysOn : false,
			breakpoint : false,
			modalDelay : 0,
			fixed: false,
			windowBreakpoint: false,
			windowMargin : false
		};
		
		$.extend( options, optionsPassed );
		
		// create overlay if not set
		if ( options.overlay === 'default' ) {
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
		
		// activate modal is alwaysOn is set
		if (options.alwaysOn) {
			modal.hmcShowModal( options );
		}
		
		// ensure that modal display is fixed if fixed option is true
		modal.css({'position':'fixed'});
		
		// update modal sizing when window size/scroll has changed
		$(window).resize( function() {
			// run normal resizer if not in mobile fullscreen mode
			if ( modal.is(':visible')) {
				modal.hmcShowModal( options );
			}
		});
		$(window).scroll( function() {
			if ( !(options.breakpoint && window.outerWidth < options.breakpoint) ) {
				modal.filter(':visible').hmcCenterInWindow( options );
			}
		});
		$(window).trigger('resize');
		
		// modal methods
		modal.close = function() {
			modal.hmcHideModal( options );
		}
	};
	
	// make modal go full screen or undo fullscreen
	$.fn.hmcFullScreen = function( options, fullscreen ) {
		var modal = $(this);
		var position = options.fixed ? 'fixed' : 'absolute';
	
		// look for fullscreen class to test for if we need to change modes
		if ( fullscreen && !$('body').hasClass('fullscreen') ) {
			modal.css({
				'border-radius' : 0,
				'left' : 'auto',
				'min-height' : '100%',
				'top' : 'auto',
				'position' : 'absolute',
				'width' : '100%'
			});
			$('body').addClass('fullscreen');
			
		} else if ( !fullscreen && $('body').hasClass('fullscreen') ) {
			
			
			modal.css({
				'border-radius' : '',
				'height' : '',
				'left' : '',
				'min-height' : '',
				'position' : position,
				'top' : '',
				'width' : ''
			});
			$('body').removeClass('fullscreen');
		}
		
		if ( fullscreen && options.windowBreakpoint && options.windowMargin ) {
			var fsTopMargin = options.windowMargin.top[0];
			modal.css({
				'top' : fsTopMargin,
				'min-height' : $(window).height() - fsTopMargin
			});
		}
	};
	
	// center modal in browser window
	$.fn.hmcCenterInWindow = function( options ) {
		$(this).hide();

		var scrollLeft = 0;
		var scrollTop = 0;
		var windowMarginTop = 0;
		var windowMarginRight = 0;
		var windowMarginBottom = 0;
		var windowMarginLeft = 0;
		
		// account for scroll position if fixed
		if ( !options.fixed ) {
			scrollLeft = $(document).scrollLeft();
			scrollTop = $(document).scrollTop();
		}
		
		// set window margin (distance from window) based on breakpoint
		
		var breakpoint = options.breakpoint;
		if ( options.windowBreakpoint ) {
			breakpoint = options.windowBreakpoint
		}
		
		if ( options.windowMargin ) {
			var whichIndex = 0;
			if ( !breakpoint || window.outerWidth > breakpoint ) {
				windowMarginTop = options.windowMargin.top[1];
				windowMarginRight = options.windowMargin.right[1];
				windowMarginBottom = options.windowMargin.bottom[1];
				windowMarginLeft = options.windowMargin.left[1];
			} else if ( breakpoint && options.windowMargin ) {
				windowMarginTop = options.windowMargin.top[0];
				windowMarginRight = options.windowMargin.right[0];
				windowMarginBottom = options.windowMargin.bottom[0];
				windowMarginLeft = options.windowMargin.left[0];
			}
		}
		
		var heightDiff = $(window).height() - $(this).outerHeight(true);
		if ( heightDiff < windowMarginTop ) {
			heightDiff = windowMarginTop;
		}
		
		$(this).css('left', Math.round( scrollLeft + ( ( $(window).width() - $(this).outerWidth(true) ) / 2) )  + 'px');
		$(this).css('top', Math.round( scrollTop + ( ( heightDiff + windowMarginTop ) / 2) )  + 'px');
		
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
	$.fn.hmcShowModal = function( options ){
		// use timeout to allow for delay option
		var modal = $(this);
		if ( options.overlay ) {
			options.overlay.hmcFitToWindow();
		}
		setTimeout( function() {
			modal.hmcCenterInWindow( options );
			
			if ( options.breakpoint && window.outerWidth < options.breakpoint ) {
				modal.hmcFullScreen( options, true);
			} else {
				modal.hmcFullScreen( options, false);
			}
		}, options.modalDelay);
	};
	
	// hides targeted modal
	$.fn.hmcHideModal = function( options ) {
		$(this).hide();
		if (options.overlay) {
			options.overlay.hide();
		}
	};
	
}( jQuery ));