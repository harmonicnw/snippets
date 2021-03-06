# Harmonic Aspect Ratio Compare jQuery plugin

Adds class to DOM element indicating if its aspect ratio is taller or wider than the provided ratio. This plugin allows video and image elements within a container having a variable aspect ratio to always either cover or be contained within that container via CSS.

https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

## Dependencies

* jQuery

## Usage
```
$('#video-wrapper').hmcCompareAspect({
  ratio: 16/9
});
```

## Options

* **ratio** : *( required | number | default = 1 )* child aspect ratio
* **onComplete** : *( function | default = false )* function to run after comparison
* **innerDimensions** : *( boolean | default = false )* use height() and width() to calculate aspect ratio of container rather than outerHeight() and outerWidth() which includes padding and borders

## To do

* add client-side check for media aspect ratio when one is not given in parameters
