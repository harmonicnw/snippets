(function ( $ ) {

	/*
	Harmonic Dynamic Modal jQuery plugin
  Adds ability to add modals.
	Version: 1.1
	https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

	Options:
	{
		selector : ( jQuery selector | default = '[data-dynamic-modal],[data-dynamic-modal-content],[data-dynamic-modal-source]' ) selector to look for (currently an attribute)
	}

	Usage:
	$('.site-wrapper').hmcDynamicModal();
	*/

  $.fn.extend({
    hmcDynamicModal: function( optionsPassed ) {
      // set initial parameters
      var options = {
        selector: '[data-dynamic-modal],[data-dynamic-modal-content],[data-dynamic-modal-source]',
      };

      $.extend( options, optionsPassed );

      // find selectors in target, including self
      $(this)
        .find(options.selector)
        .add($(this).filter(options.selector))
        .hmcDynamicModalInit();
    },
    hmcDynamicModalInit: function( options ) {
      var prevModalHtml = false;

      // add click events
      $(this).each(function(){
        var target = $(this);
        $(this).click(function(){
          // generate modal HTML
          var modalContentSourceId = target.attr('data-dynamic-modal-source');
          var $modalContentSourceObj = $("#" + modalContentSourceId);
          var modalContentHtml = $modalContentSourceObj.html();

          var modalHtml = "";
          modalHtml += "<div class=\"modal\">";
          modalHtml += "<div class=\"close\" onclick=\"jQuery('body').removeClass('modal-active').children('.modal,.overlay').remove()\"><i class=\"fas fa-times\"></i></div>";
          modalHtml += "<div class=\"box\"><div class=\"scroll-container\">" + modalContentHtml + "</div></div>";
          modalHtml += "</div>";

          // append modal unless modal is identical to another active modal
          if (!$('body').hasClass('modal-active') || !prevModalHtml || (modalHtml !== prevModalHtml)) {
            $('body > .modal').remove();
            $('body').append(modalHtml);
            prevModalHtml = modalHtml;
          }

          // add modal active class
          $('body').addClass('modal-active');

          // add overlay if another isn't already present
          if (!$('body > .overlay').length) {
            $('body').append('<div class="overlay"></div>');
          }
        });
      });
    }
  });

}( jQuery ));
