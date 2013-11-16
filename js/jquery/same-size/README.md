# Harmonic Same Size jQuery plugin
### Version: 1.0.0
	
## Dependencies

* jQuery (optimized for 10.2)
	
## Usage

```
$('.some .columns').hmcSameSize({
	windowMinWidth: 920;
});
```

### Options
* **height** : *( optional | boolean | default = true )* if true, heights will be set to match
* **widths** : *( optional | boolean | default = false )* if true, widths will be set to match
* **windowMinWidth** : *( optional | number | default = 0 )* will only run resizer if window is at or over n pixels wide
* **windowMaxWidth** : *( optional | number | default = 99999 )* will only run resizer if window is under n pixels wide 
	
## To do

* check for preset heights and widths directly on DOM objs, save into object data, use for resetting original height and width when over/under windowMinWidth/windowMaxWidth
* add option to hide objects until script has run (along with some animation options like fade speed, easing, etc.)
* add option to ensure that imgs within DOM object have loaded