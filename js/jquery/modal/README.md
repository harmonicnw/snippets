# Harmonic Responsive Modal jQuery plugin
### Version: 1.0.4
### https://github.com/harmonicnw/snippets/tree/master/js/jquery/modal

## Description

This plugin creates a modal window element that can be opened, closed and automatically centers in the browser window.
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$('#modal1').hmcModal({
	overlay: $('#semiOpaqueBackground'),
	openers: $('.launchModalWhenClicked')
});
```

### Options	

* **option_name** : *( optional | integer | default = 0 )* description goes here
* **overlay** : *( required | jQuery object | default = default )* set the screen overlay object that sits behind the modal window,
* **openers** : *( option | jQuery object | default = false )* jQuery collection of DOM objects that when clicked open the modal,
* **closers** : *( option | jQuery object | default = false )* jQuery collection of DOM objects that when clicked close the modal
* **alwaysOn** : *( option | jQuery object | default = false )* jQuery collection of DOM objects that when clicked close the modal
* **alwaysOn** : *( option | jQuery object | default = false )* if true, the modal will always be on
* **breakpoint** : *( optional | number | default = false )* if set, the modal will switch to mobile mode (fullscreen) when screen width is below set value
* **modalDelay** : *( optional | number | default = 0 )* number of milliseconds to delay loading modal (but not overlay)
* **fixed** : *( optional | boolean | default = false )* if true, modal uses fixed positioning
* **windowMargin** : *(optional | object | default = false )* set margins for margin distance from edges of the window. can be set with or without breakpoints:
```		
{
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
}
```
or
```
{
	top: [ default, above-first-breakpoint ],
	right: [ default, above-first-breakpoint ],
	bottom: [ default, above-first-breakpoint ],
	left: [ default, above-first-breakpoint ]
}
```
	
## To do
* window margin: implement left/bottom/right
* window margin: actual usable defaults
* window margin: implementation for no breakpoint
* make fixed mode default?