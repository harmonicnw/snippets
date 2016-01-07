# Harmonic Cross Fader jQuery plugin
### Version: 1.1

## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$('ul.slides').hmcCrossfade({
	delay: 3000,
	animationSpeed: 500
});
```

### Options:
* **delay** : *( optional | number | default = 7000 )* number of milliseconds between slides
* **animationSpeed** : *( optional | number | default = 500 )* number of milliseconds of fade
* **domElement** : *( optional | string | default = 'li')* selector for target element to look for within scoped object

## To do

* Add optional effects (i.e. slide up while fading)