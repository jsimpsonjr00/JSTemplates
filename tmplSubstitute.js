/*
 * jQuery Plugin function tmplSubstitute is a very simple paternized substitution
 * based on dojo.string.substitute with all dependencies removed and barebones functionality.
 *  Added ability to include map traversal with full path keys such as ${key.child.child}
 * 
 * Paramaters:
 * 	template - HTML String with patterns embedded of the form ${key} or ${key.child.child}
 *  map - Object containing keys to substitute in.
 *
 * Returns:
 * 	String - final string after pattern substitution completes
 */
( function ( $ ) {
	$.tmplSubstitute = function( template, map ){
		transform = function(v){ return v; };
		
		//Replace instances of ${key.child.child} pattern
		return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
			function(match, key ){
				var splitKey = key.split("."),
					value = "",
					temp = "";
				
				for( var SK in splitKey ) { //Handle map traversal 
					temp = splitKey[SK];	//cache current key
					if( map[temp] ) {
						value = map[temp];
					}
					else {	//key maps to an invalid location in map, break out
						value = "";
						break;
					} 
				}
				return value.toString();
			}
		);
	};
})( jQuery );