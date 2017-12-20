(function ( $ ) {

	/*
	Harmonic Aspect Ratio Compare jQuery plugin
  Adds class to DOM element indicating if its aspect ratio is taller or wider than the provided ratio. This plugin allows video and image elements within a container having a variable aspect ratio to always either cover or be contained within that container via CSS.
	Version: 1.0

	Options:
	{
		ratio : ( required | number | default = 1 ) child aspect ratio
	}

	Usage:
	$('#video-wrapper').hmcAspect({
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
				ratio : 1
			};

			$.extend( options, optionsPassed );

			$(window).resize( function() {
				targets.hmcCAGo( options );
			});

			targets.hmcCAGo( options );
		},
		hmcCAGo: function( options ) {
      $(this).removeClass('aspect-compare-taller aspect-compare-wider aspect-compare-equal');
			var myAspectRatio = $(this).width() / $(this).height();
      if (myAspectRatio < options.ratio) {
        $(this).addClass('aspect-compare-taller');
      } else if (myAspectRatio > options.ratio) {
        $(this).addClass('aspect-compare-wider');
      } else {
        $(this).addClass('aspect-compare-equal');
      }
		}
	});
}( jQuery ));
