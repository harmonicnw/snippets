# Harmonic RSS Display jQuery plugin
### Version: 1.0.0
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

$(".myContainerObj").hmcRss( options );

### Options	

* feeds : [required] (array) feeds to load
* images : [optional] (array) image urls that correspond with feeds
* entries : [optional] (integer, default = 8) number of feed entries to display
* forceUseImages : [optional] (boolean, default = false) use image array from images rather than image found in feed entry
* teaserLength : [optional] (boolean, default = 90) # of characters at which teaser truncates
* titleLength : [optional] (boolean, default = 50) # of characters at which title truncates
* maxEntriesPerSource : [optional] (integer, default = 0.33 * entries) max # of entries from a single feed source
	
## To do

* option for default image
* allow custom display HTML option like: layout: "<article><a href="%link%">%img%</a></article>"
* minimum image size option for images found in RSS content
* better documentation here