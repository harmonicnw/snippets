var hmcOffsiteLinks;

(function () {

	/*
	Harmonic Offsite Links Plugin
	Version: 1.1.0
	https://github.com/harmonicnw/snippets/tree/master/js/plugins/offsite-links

	Dependencies:
	 - none

	Options:
	{
		site : ( optional | string | default = document.location.host ) string that identifies this site
		target : ( optional | string | default = 'body' ) selector of container element to apply offsite links to
	}

	Usage:
	hmcOffsiteLinks({
		site : "harmonicnw.com"
	});
	*/

	hmcOffsiteLinks = function( optionsPassed ) {

		// set initial parameters
		var options = {
			site: document.location.host,
			target: 'body'
		};

		// extend parameters
		if (optionsPassed) {
			if (optionsPassed.hasOwnProperty('site')) {
				options.site = optionsPassed.site;
			}
			if (optionsPassed.hasOwnProperty('target')) {
				options.target = optionsPassed.target;
			}
		}

		// add target="_blank" to anchor tags in target element
		var anchors = document.querySelectorAll( options.target + ' a' );
		for(var i = 0; i < anchors.length; ++i) {
			var myhref = anchors[i].href;
			if( myhref && ( (myhref.indexOf( "http://" ) !== -1 || myhref.indexOf( "https://" ) !== -1) && myhref.indexOf( options.site ) === -1 ) ) {
				anchors[i].target = "_blank";
			}
		};
	};

}());
