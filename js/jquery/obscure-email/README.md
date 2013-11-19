# Harmonic Obscure Email jQuery plugin
### Version: 1.1.0
	
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
* **text** : *( optional | string or boolean | default = false, email if innerHTML is empty, otherwise keep innerHTML )* link text
* **mailto** : *( optional | boolean | default = true )* if true, add mailto link to object href property

	
## To do

* add option for including email address into text like "Send email to %email% now!"
* add options for subject and body strings