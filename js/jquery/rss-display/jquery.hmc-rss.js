(function ( $ ) {

	/*
	Harmonic RSS Display jQuery Plugin
	Version: 1.0.3
	
	Download and read documentation at: https://github.com/harmonicnw/snippets/tree/master/js/jquery/rss-display
	
	Dependencies:
	 - jQuery (optimized for 10.2)
	 - Google JSON API
	
	Usage:
	Include google JSON API on page before running script
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	
	Then:
	$(".myContainerObj").hmcRss( options );
	
	Options:
	{
		feeds : ( required | array ) feeds to load
		images : ( optional | array | default = [] ) image urls that correspond with feeds
		entries : ( optional | integer | default = 8 ) number of feed entries to display
		forceUseImages : ( optional | boolean | default = false ) use image array from images rather than image found in feed entry
		teaserLength : ( optional | integer | default = 90 ) # of characters at which teaser truncates
		titleLength : ( optional | integer | default = 50 ) # of characters at which title truncates
		maxEntriesPerSource : ( optional | integer | default = 0.33 * entries ) max # of entries from a single feed source
		filterImagesFrom : ( optional | array | default = a few feed host urls ) an array of urls to exclude from image sources. adds to default list rather than replacing it.
	}
	*/
	
	var googleFeedsLoaded = false;
	google.load("feeds", "1");
	google.setOnLoadCallback( function() {
		googleFeedsLoaded = true;
	});
	
	$.fn.hmcRss = function( optionsPassed ) {
		var container = $(this);
		
		// make sure google feeds scripts have loaded
		if ( !googleFeedsLoaded ) {
			setTimeout( function() {
				container.hmcRss( optionsPassed );
				return;
			}, 100 );
			return;
		}
	
		var feedLoadObjs = []; // holds google feed obj
		var feedEntries = []; // holds loaded feed data (JSON)
		var filterImagesFromDefault = [
			"feeds.feedburner.com",
			"feedsportal.com"
		];

		// set option defaults
		var options = {
			'entries' : 8,
			'images' : [],
			'forceUseImages' : false,
			'teaserLength' : 90,
			'titleLength' : 50,
			'filterImagesFrom' : []
		}
		
		// set maxEntriesPerSource
		options.maxEntriesPerSource = Math.round( options.entries * 0.33 );
		
		$.extend( options, optionsPassed );
		
		// merge in filterImagesFrom array
		options.filterImagesFrom = options.filterImagesFrom.concat( filterImagesFromDefault ).unique();
		
		for (var i = 0; i < options.feeds.length; i++) {
			feedLoadObjs[i] = new google.feeds.Feed( options.feeds[i] );
			feedLoadObjs[i].setNumEntries(options.maxEntriesPerSource);
			feedLoadObjs[i].load( addEntries );
		}
		
		var feedsAdded = 0; // create variable to check when all feed srouces have been loaded
		
		function addEntries(result) {
		
			if (!result.error) {
				for (var i = 0; i < result.feed.entries.length; i++) {					
					feedEntries.push(result.feed.entries[i]);
					var thisEntry = feedEntries[(feedEntries.length - 1)];
					
					thisEntry.feedTitle = result.feed.title;
					thisEntry.feedUrl = result.feed.feedUrl;
					thisEntry.feedLink = result.feed.link;
					thisEntry.truncatedContent = thisEntry.contentSnippet.trunc(90,true);
					thisEntry.truncatedTitle = thisEntry.title.trunc(52,true);
					
					thisEntry.imageUrl = getImageUrl( thisEntry, options );
				}
		    }
		    
		    feedsAdded++;
		    
		    if (feedsAdded >= options.feeds.length) {
		    	displayFeeds( feedEntries );
		    	return;
		    }
		}
		
		// find and set image
		function getImageUrl( thisEntry, options ) {
			var feedImageUrl = false;
		
			// match up feed image in options by matching up current feed URL with present one (complicated due to async loading)
			for ( var i = 0; i <= options.images.length; i++) {
				if ( options.feeds[i] == thisEntry.feedUrl && options.images[i] !== null && options.images[i] !== false ) {
					feedImageUrl = options.images[i];
					
					// return feed image if one is found and forceUseImages is true
					if ( options.forceUseImages ) {
						return feedImageUrl;
					}
				}
			}
			
			// try to find image in content
			var contentObj = $("<div />");
			contentObj.get(0).innerHTML = thisEntry.content;
			contentImgObjs = contentObj.find("img");
			
			// if image found in content, return first one, otherwise return feed image, otherwise return nada
			if ( contentImgObjs.length > 0 ) {
				
				var imgSrc = false;
				
				// filter out urls on the no-fly list
				for ( var i = 0; i < contentImgObjs.length; i++ ) {
					var filtered = false;
					
					if (!imgSrc) {
						for ( var j = 0; j < options.filterImagesFrom.length; j++ ) {
							if ( contentImgObjs.eq(i).prop("src").indexOf( options.filterImagesFrom[j] ) != -1 ) {
								filtered = true;
							}
						}					
						if (!filtered) {
							imgSrc = contentImgObjs.eq(i).prop("src");
						}
					}
				}
				
				// if we have a viable image..
				if (imgSrc) {				
					// test to see if src is relative (jQuery will add your site's domain to the base url if so)
					// replace this with the article site location
					var mySiteLoc = document.location.protocol + "//" + document.location.host;
					if ( imgSrc.indexOf( mySiteLoc ) != -1 ) {
						imgSrc = imgSrc.replace( mySiteLoc, thisEntry.feedLink );
					}
				
					return imgSrc;
				}
			
			}
			
			return feedImageUrl;
			
		}
		
		var linkObjArr = [];
		function displayFeeds( feedEntries ) {
			feedEntries.sort(function(a,b) {
				var dateA = new Date( a['publishedDate'] );
				var dateB = new Date( b['publishedDate'] );
				
				if (dateA < dateB) {
					return 1;
				} else if (dateA > dateB) {
					return -1;
				} else {
					return 0;
				}
			});
			feedEntries = feedEntries.slice( 0 , options.entries );
		
			var html = "";
			for (var i = 0; i < feedEntries.length; i++) {
				// write rows
				if (i%4 == 0 ) { // every fourth entry
					html += "<div class='row'>";
				}
				
				// set image if one is found
				var bgImgStyle = "";
				if ( feedEntries[i].imageUrl ) {
					bgImgStyle = "style='background-image:url(" + feedEntries[i].imageUrl + ");'";
				}
						
				html += "<article class='col-md-3'>";
				html += "<a href='" + feedEntries[i].link + "'><img src='" + bloginfo.template_url + "/images/spacer_23x13.png' alt='article image' " + bgImgStyle + " /></a>";
				html += "<h4><a href='" + feedEntries[i].link + "'>" + feedEntries[i].truncatedTitle + "</a></h4>";
				html += "<h6>" + feedEntries[i].feedTitle + "</h6>";
				html += "<p>" + feedEntries[i].truncatedContent + " <a href='" + feedEntries[i].link + "'>more&nbsp;&#8250;</a></p>";
				html += "</article>";
				
				if ( i > 0 && ( i%4 == 3 || i == feedEntries.length - 1 ) ) { // every fourth entry or last entry..
					html += "</div>";
				}
			}
			container.html(html);
		}
	
	
	}

	// truncate string
	String.prototype.trunc = function(n,useWordBoundary) {
		var toLong = this.length > n, s_ = toLong ? this.substr(0, n-1) : this;
		s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
		return  toLong ? s_ + '&hellip;' : s_;
	};
	
	// remove duplicates from array
	// from http://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript
	Array.prototype.unique = function() {
	    var a = this.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }
	
	    return a;
	};

}( jQuery ));