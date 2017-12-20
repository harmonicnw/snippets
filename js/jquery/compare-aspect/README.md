# Harmonic Aspect Ratio Compare jQuery plugin
## Version: 1.0
### https://github.com/harmonicnw/snippets/tree/master/js/jquery/compare-aspect

Adds class to DOM element indicating if its aspect ratio is taller or wider than the provided ratio. This plugin allows video and image elements within a container having a variable aspect ratio to always either cover or be contained within that container via CSS.

## Dependencies

* jQuery

## Usage
```
$('#video-wrapper').hmcAspect({
  ratio: 16/9
});
```

## Options

* **ratio** : *( required | number | default = 1 )* child aspect ratio

## To do

* add client-side check for media aspect ratio when one is not given in parameters
