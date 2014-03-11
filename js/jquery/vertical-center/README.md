# Harmonic Vertical Center jQuery plugin
### Version: 1.0.0
	
## Dependencies

* jQuery (optimized for 10.2)
	
## Usage

```
$('section').hmcVerticalCenter();
```

### Options
* **minWidth** : *( optional | integer | default = 0 )* minimum window width to apply the vertical centering
* **sameHeight** : *( optional | boolean | default = false )* if set to true, all elements are set to the same height so that contents align appear vertically aligned when sitting side by side
	
## To do

* check for preset heights and widths directly on DOM objs, save into object data, use for resetting original height and width when over/under windowMinWidth/windowMaxWidth
* add option to hide objects until script has run (along with some animation options like fade speed, easing, etc.)
* add option to ensure that imgs within DOM object have loaded