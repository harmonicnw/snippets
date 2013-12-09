# Harmonic RSS Display jQuery plugin
### Version: 1.0.3
	
## Dependencies

* jQuery (optimized for 10.2)
* Google JSON API	
	
## Usage

Embed JSON API on your page
```
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
```

Then run script:
```
$(".myContainerObj").hmcRss( options );
```

### Options	

* **feeds** : *( required | array )* feeds to load
* **images** : *( optional | array | default = [] )* image urls that correspond with feeds
* **entries** : *( optional | integer | default = 8 )* number of feed entries to display
* **forceUseImages** : *( optional | boolean | default = false )* use image array from images rather than image found in feed entry
* **teaserLength** : *( optional | boolean | default = 90 )* # of characters at which teaser truncates
* **titleLength** : *( optional | boolean | default = 50 )* # of characters at which title truncates
* **maxEntriesPerSource** : *( optional | integer | default = 0.33 * entries )* max # of entries from a single feed source
	
## To do

* option for default image
* test for spacer images (1px dimension)
* allow custom display HTML option like: layout: "&lt;article&gt;&lt;a href="&#37;link&#37;"&gt;&#37;img&#37;&lt;/a&gt;&lt;/article&gt;"
* minimum image size option for images found in RSS content
* add option to filter out hosts for image selection
* better documentation