/*
 * jQuery Plugin function tmplSubstitute is a very simple paternized substitution
 * based on dojo.string.substitute with all dependencies removed and barebones functionality.
 *  Added ability to include map traversal with full path keys such as ${key.child.child}
 * 
 * Paramaters:
 * 	template - HTML String with patterns embedded of the form ${key} or ${key.child.child}
 *	map - Object containing keys to substitute in.
 *
 * Returns:
 * 	String - final string after pattern substitution completes
 */
( function ( $ ) {
	$.tmplSubstitute = function( template, map ){
		//Replace instances of ${key.child.child} pattern
		var html = template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
			function(match, key ){
				var splitKey = key.split("."),
					value = map,
					temp = "";
				
				for( var SK in splitKey ) { //Handle map traversal 
					temp = splitKey[SK];	//cache current key
					if( value[temp] != undefined ) {
						value = value[temp];
					}
					else {	//key maps to an invalid location in map, break out
						value = "";
						console ? console.log("Key: " + key + " element " + temp + " undefined in template map") : null;
						break;
					} 
				}
				return value.toString();
			}
		);
		return html;
	};
})( jQuery );