/*
 * applyTemplate - jQuery Plugin function interprets this as a JSTemplate element and
 * 	performs a template substitution with the provided map
 * 
 * Paramaters:
 * 	data - 	If Array, treated as a collection of maps to iterate.( Object[] )
 * 			If Object treat as a single map. ( Object )
 *
 * Returns:
 * 	String - final string after pattern substitution completes
 * 
 * Usage:
 * 	$("#my-template").applyTemplate( data );
 */
( function ( $ ) {
	$.fn.applyTemplate = function ( data ) {
		var template 	= this.html(),
			html 		= "",
			i;
		
		if( data instanceof Array || Object.prototype.toString.call(data) === "[object Array]" ) { //treat as an array of maps
			for ( i in data ) {
				html += $.JSTemplates.substitute( template, data[i] );
			}
		} 
		else {
			html = $.JSTemplates.substitute( template, data );
		}
		return $( $.parseHTML( html ) ); //jQuery 1.9.1 was complaining about some input, this is a workaround
	};
})( jQuery );