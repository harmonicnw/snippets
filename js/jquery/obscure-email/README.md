# Harmonic Obscure Email jQuery plugin
### Version: 1.0.0
	
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

* **emailArray** : *( required | array )* series of strings that compromise email address in reverse order
* **text** : *( optional | string or boolean | default = email address )* if set as a string, text to display within element. if set as boolean, true = set to email address, false = do not modify text in object
* **mailto** : *( optional | boolean | default = true )* if true, add mailto link to object href property

	
## To do

* add option for including email address into text like "Send email to %email% now!"
* add options for subject and body strings