(function ( $ ) {

	/*
	Harmonic Aspect Ratio Compare jQuery plugin
  Adds class to DOM element indicating if its aspect ratio is taller or wider than the provided ratio. This plugin allows video and image elements within a container having a variable aspect ratio to always either cover or be contained within that container via CSS.
	Version: 1.3.1
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

	Options:
	{
		ratio : ( required | number | default = 1 ) child aspect ratio
		onComplete : ( function | default = false ) function to run after comparison
		innerDimensions : ( boolean | default = false ) use height() and width() to calculate aspect ratio of container rather than outerHeight() and outerWidth() which includes padding and borders
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
      var ticking = false;

			// set initial parameters
			var options = {
				onComplete: false,
        innerDimensions: false,
				ratio: 1
			};

			$.extend( options, optionsPassed );

      function update() {
        ticking = false;
        targets.hmcCAGo( options );
      }

			$(window).resize( function() {
        if (!ticking) {
          requestAnimationFrame(update);
        }
        ticking = true;
			});

      update();
		},
		hmcCAGo: function( options ) {
      $(this).each(function(){

        $(this).removeClass('aspect-compare-taller aspect-compare-wider aspect-compare-equal aspect-compare-loading');

        var width, height;

        if (options.innerDimensions) {
          width = $(this).width();
          height = $(this).height();
        } else {
          width = $(this).outerWidth();
          height = $(this).outerHeight();
        }

        // return if height or width are 0
        if (width === 0 || height === 0) {
					return;
				}

  			var myAspectRatio = width / height;

        if (myAspectRatio < options.ratio) {
          $(this).addClass('aspect-compare-taller');
        } else if (myAspectRatio > options.ratio) {
          $(this).addClass('aspect-compare-wider');
        } else {
          $(this).addClass('aspect-compare-equal');
        }
      });

      if (options.onComplete) {
        options.onComplete();
      }
		}
	});
}( jQuery ));
