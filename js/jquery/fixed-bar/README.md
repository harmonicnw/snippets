# Harmonic Fixed Bar jQuery plugin
### Version: 1.0.0
### https://github.com/harmonicnw/snippets/tree/master/js/jquery/fixed-bar

## Description

This plugin makes an existing DOM element an (optionally) "sticky" floating bar.
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$('.fixedbar').hmcFixedBar({
	top : 65,
	zIndex : 9999
});
```

### Options	

* **top** : *( optional | integer | default = 0 )* determines top sticky point in pixels
* **minWindowWidth** : *( optional | integer | default = 768 )* determines minimum window width in pixels to initiate stickiness
* **zIndex** : *( optional | integer | default = 1 )* sets z-index of floated element
	
## To do

* more testing