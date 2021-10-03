# Harmonic Offsite Links plugin
### Version: 1.2.0

## Dependencies

* none

## Usage

```
const hmcOL = require('./vendor/hmc-offsite-links.js');

hmcOL.offsiteLinks({
	site : "harmonicnw.com"
});
```

### Options

* **site** : *( optional | string | default = document.location.host )* string that identifies this site
* **target** : *( optional | string | default = 'body' )* selector of container element to apply offsite links to
