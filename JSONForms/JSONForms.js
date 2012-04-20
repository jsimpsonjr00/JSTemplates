( function ( $) {
	//Builds a form from the supplied JSON Schema and sets the calling object's HTML to the resultant form
	$.fn.JSONForm = function ( schema ) {
		return this.html( $.buildJSONFormSchema( schema ) );
	}
	function appendOptions ( $group, type, data ) {
		var $template	= $("#form-field-template-" + type + "-option"),
			i;
		
		for( i in data.options ) {
			data.option = data.options[i];	//temporarily copy this option to the data object
			$group.append( $template.applyTemplate( data ) );
		}
	}
	//Interprets a JSON schema into for HTML
	$.buildJSONFormSchema = function ( schema ) {
		//jQuery object DOM references
		var $formTemplate = $("#generic-form-schema-template"),
			$form 	= $formTemplate.applyTemplate( schema ), //$( $formTemplate.html() ),
			$body	= $form.find(".modal-body");
		
		//vars for use in traversal of fields
		var	fields,
			i,
			type,
			$temp;
		
		if( schema != undefined ){
			fields = schema.fields; //array of objects
			for( i in fields ) {
				type = fields[i].type;
				$temp = $("#form-field-template-" + type).applyTemplate( fields[i] );
				
				if( fields[i].options != undefined) { //type == "radio" ) {
					appendOptions( $temp, type, fields[i] );
				}
				$body.append( $temp );
			}
		}
		else { //return an object with an error message
			$body.html( "<h3>The Supplied form Schema was undefined.</h3>");
		}
		return $form;
		//returns a jQuery object representing the supplied schema 
	}
})( jQuery );