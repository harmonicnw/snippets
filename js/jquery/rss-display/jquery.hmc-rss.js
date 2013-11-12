(function ( $ ) {

	/*
	Harmonic RSS Display jQuery plugin
	Version: 1.0.0
	
	To do:
	 - option for default image
	 - allow custom display HTML option like: layout: "<article><a href="%link%">%img%</a></article>"
	 - minimum image size option for images found in RSS content
	*/
	
	var googleFeedsLoaded = false;
	google.load("feeds", "1");
	google.setOnLoadCallback( function() {
		googleFeedsLoaded = true;
	});
	
	/*
	Options: {
		feeds : [required] (array) feeds to load
		images : [optional] (array) image urls that correspond with feeds
		entries : [optional] (integer, default = 8) number of feed entries to display
		forceUseImages : [optional] (boolean, default = false) use image array from images rather than image found in feed entry
		teaserLength : [optional] (boolean, default = 90) # of characters at which teaser truncates
		titleLength : [optional] (boolean, default = 50) # of characters at which title truncates
		maxEntriesPerSource : [optional] (integer, default = 0.33 * entries) max # of entries from a single feed source
	}
	*/
	
	$.fn.hmcRss = function( optionsPassed ) {
		var container = $(this);
		
		// make sure google feeds scripts have loaded
		if ( googleFeedsLoaded ) {
			setTimeout( function() {
				container.hmcRss( optionsPassed );
				return;
			}, 100 );
			return;
		}
	
		var feedLoadObjs = []; // holds google feed obj
		var feedEntries = []; // holds loaded feed data (JSON)

		// set option defaults
		var options = {
			'entries' : 8,
			'images' : [],
			'forceUseImages' : false,
			'teaserLength' : 90,
			'titleLength' : 50
		}
		
		$.extend( options, optionsPassed );
		
		// set maxEntriesPerSource
		options.maxEntriesPerSource = Math.round( options.entries * 0.33 );
		
		for (var i = 0; i < options.feeds.length; i++) {
			feedLoadObjs[i] = new google.feeds.Feed( options.feeds[i] );
			feedLoadObjs[i].setNumEntries(options.maxEntriesPerSource);
			feedLoadObjs[i].load( addEntries );
		}
		console.log("feedLoadObjs = "); console.dir(feedLoadObjs);
		
		var feedsAdded = 0; // create variable to check when all feed srouces have been loaded
		
		function addEntries(result) {
			//console.log('addFeed');
			console.log("result = "); console.dir(result);
			if (!result.error) {
				for (var i = 0; i < result.feed.entries.length; i++) {
					
					//console.log("result = "); console.dir(result);
					//console.log('addEntries');
					
					feedEntries.push(result.feed.entries[i]);
					var thisEntry = feedEntries[(feedEntries.length - 1)];
					
					thisEntry.feedTitle = result.feed.title;
					thisEntry.feedUrl = result.feed.feedUrl;
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
		
			// match up feed image by matching up current feed URL with present one (complicated due to async loading)
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
				return contentImgObjs.first().prop("src");
			} else {
				return feedImageUrl;
			}
			
		}
		
		var linkObjArr = [];
		function displayFeeds( feedEntries ) {
		
			console.log("feedEntries = "); console.dir(feedEntries);
			
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

}( jQuery ));