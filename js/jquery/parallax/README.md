# Harmonic Parallax jQuery pluggin. 
### Version: 1.0.0
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$('.parallax').hmcParallax({scRate: 0.5, minWidth: 900});
	
```

### Options	

* **scRate** : ( optional | integer | default = 0.3 ) identifies the scroll rate for the parallaxed background image, must be an integer between 0 and 1.
* **minWidth** : ( optional | integer | default = 768 ) identifies the minimum screen width required for the parallax to operate.

## To do

* Add reverese parallax
* Add option for horizontal parallax
* Fix bug where images can scroll beyond the height of their parent div. 