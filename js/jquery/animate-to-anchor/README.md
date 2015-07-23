# Harmonic Animate to Anchor jQuery plugin
### Version: 1.0.3
### https://github.com/harmonicnw/snippets/tree/master/js/jquery/animate-to-anchor
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$("nav").hmcAnimateToAnchor( {bufferTop : -40, bufferTopMobile : -10, breakpoint : 992} );

```

### Options	

* **bufferTop** : *( optional | integer | default = 0 )* identifies the top buffer for pages that have a sticky header.
* **bufferTopMobile** : *( optional | integer | default = 0 )* sets the buffer for mobile devices.
* **breakpoint** : *( optional | integer | deafault = 768 )* sets the breakpoint for mobile devices (in pixels),
* **delay** : *( optional | number | default = 0 )* delay before animation begins
* **speed** : *( optional | milliseconds | default = 1000 )* speed of animation

## To do

* need better system for adding multiple breakpoints and buffers