(function ( $ ) {

	/*
	Harmonic Dynamic Modal jQuery plugin
  Adds ability to add modals.
	Version: 1.0
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

	Options:
	{
		selector : ( jQuery selector | default = '[data-dynamic-modal],[data-dynamic-modal-content],[data-dynamic-modal-source]' ) selector to look for (currently an attribute)
	}

	Usage:
	$('body').hmcDynamicModal();

	To do:
	 - use jquery selector to limit range of initialization
	*/

  $.fn.extend({
    hmcDynamicModal: function( optionsPassed ) {
      // set initial parameters
      var options = {
        selector: '[data-dynamic-modal],[data-dynamic-modal-content],[data-dynamic-modal-source]',
      };

      $.extend( options, optionsPassed );

      $(options.selector).hmcDynamicModalInit();
    },
    hmcDynamicModalInit: function( options ) {
      // add click events
      $(this).each(function(){
        var target = $(this);
        $(this).click(function(){
          // append overlay
          $('body').append('<div class="overlay"></div>').addClass('modal-active');

          // generate modal HTML
          var modalContentSourceId = target.attr('data-dynamic-modal-source');
          var $modalContentSourceObj = $("#" + modalContentSourceId);
          var modalContentHtml = $modalContentSourceObj.html();

          var modalHtml = "";
          modalHtml += "<div class=\"modal\">";
          modalHtml += "<div class=\"close\" onclick=\"jQuery('body').removeClass('modal-active').children('.modal,.overlay').remove()\"><i class=\"fas fa-times\"></i></div>";
          modalHtml += "<div class=\"box\"><div class=\"scroll-container\">" + modalContentHtml + "</div></div>";
          modalHtml += "</div>";

          // append modal
          $('body').append(modalHtml);
        });
      });
    }
  });

}( jQuery ));
