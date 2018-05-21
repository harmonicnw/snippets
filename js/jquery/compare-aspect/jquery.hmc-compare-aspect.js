(function ( $ ) {

	/*
	Harmonic Aspect Ratio Compare jQuery plugin
  Adds class to DOM element indicating if its aspect ratio is taller or wider than the provided ratio. This plugin allows video and image elements within a container having a variable aspect ratio to always either cover or be contained within that container via CSS.
	Version: 1.2.1
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

	Options:
	{
		ratio : ( required | number | default = 1 ) child aspect ratio
		onComplete : ( function | default = false ) function to run after comparison
	}

	Usage:
	$('#video-wrapper').hmcCompareAspect({
    ratio: 16/9
  });

	To do:
	 - add client-side check for media aspect ratio when one is not given in parameters
	*/

	$.fn.extend({
		hmcCompareAspect: function( optionsPassed ) {
			var targets = $(this);

			// set initial parameters
			var options = {
				onComplete : false,
				ratio : 1
			};

			$.extend( options, optionsPassed );

			$(window).resize( function() {
				targets.hmcCAGo( options );
			});

			targets.hmcCAGo( options );
		},
		hmcCAGo: function( options ) {
      $(this).removeClass('aspect-compare-taller aspect-compare-wider aspect-compare-equal aspect-compare-loading');
			var myAspectRatio = $(this).width() / $(this).height();
      if (myAspectRatio < options.ratio) {
        $(this).addClass('aspect-compare-taller');
      } else if (myAspectRatio > options.ratio) {
        $(this).addClass('aspect-compare-wider');
      } else {
        $(this).addClass('aspect-compare-equal');
      }
			if (options.onComplete) {
        options.onComplete();
      }
		}
	});
}( jQuery ));
