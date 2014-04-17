# Harmonic Responsive Modal jQuery plugin
### Version: 1.0.0
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
	
## To do