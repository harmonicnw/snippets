# Harmonic Obscure Email jQuery plugin
### Version: 1.2.2
	
## Dependencies

* jQuery (optimized for 10.2)	
	
## Usage

```
$('a.email-link').hmcObscureEmail({
	emailArray : [
		'l.com',
		's@myemai',
		'my_addres'
	]
});
```

### Options	

* **emailArray** : *( required | array ) series of strings that compromise email address in reverse order
* **text** : *( optional | string | default = false, email if innerHTML is empty, otherwise keep innerHTML ) link text
* **linkType** : *( optional | "mailto" or "onclick" or "none" | default = "mailto" ) mailto sets link as mailto, onclick sets as a javascript onclick, anything else does not add a link
* **textObj** : *(optional | jQuery collection | default = $(this) ) if set, applies text string to an object within the link object

	
## To do

* add option for including email address into text like "Send email to %email% now!"
* add options for subject and body strings