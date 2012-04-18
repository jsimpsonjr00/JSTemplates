/*
 * applyTemplate - jQuery Plugin function interprets this as a JSTemplate element and
 * 	performs a template substitution with the provided map
 * 
 * Paramaters:
 * 	map - Object containing keys to substitute in.
 *
 * Returns:
 * 	String - final string after pattern substitution completes
 * 
 * Usage:
 * 	$("#my-template").applyTemplate( map );
 */
( function ( $ ) {
	$.fn.applyTemplate = function ( map ) { 
		return $.tmplSubstitute( this.html(), map );
	};
})( jQuery );