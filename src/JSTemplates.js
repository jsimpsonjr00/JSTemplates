/*
 * 	jQuery namspaced function $.JSTemplates.substitute is a simple paternized substitution
 * 	based on dojo.string.substitute with all dependencies removed and barebones functionality.
 *  Added ability to include map traversal with full path keys such as ${key.child.child}
 * 
 * Paramaters:
 * 	template - HTML String with patterns embedded of the form ${key} or ${key.child.child}
 *	map - Object containing keys to substitute in.
 *
 * Returns:
 * 	String - final string after pattern substitution completes
 */
/* ===============================
 * 	Inline Template Spec
 * ===============================
 * 
 * 	<template data='map.full.path.key'>
 * 		${data.relative.path.key}
 * 	</template>
 * 
 */
( function ( $ ) {
	//namespace for JSTemplate helper functions
	if( $.JSTemplates === undefined ) {
		$.JSTemplates = {};
	}
	
	$.JSTemplates.substitute = function( template, map ){
		//Replace instances of ${key.child.child} pattern
		//Template nesting pattern ${templateID:key}
		var html = $.JSTemplates.evalInlineTemplates( template, map );
		
		html = html.replace(/\$\{([^\s\}]+)(?:([^\s\}]+))?\}/g,
			function(match, key ){
				var nestedTmpl	= key.split(":"),
					dataKey		= nestedTmpl[ nestedTmpl.length - 1 ],
					value 		= $.JSTemplates.resolveKey( dataKey, map );
				
				if( nestedTmpl.length > 1 ) { //nested template, apply it to the specified data
					var $nestedTmpl = $("#" + nestedTmpl[0]);
					value = $("<div></div>").append( $nestedTmpl.applyTemplate( value ) ).html();
				}
				
				return value.toString();
			}
		);
		return html;
	};
	$.JSTemplates.evalInlineTemplates = function ( html, map ) {
		var $html		= $(html),
			templates	= $html.find("template").get().reverse(), //reverse order array of templates to process child elements first
			$templates 	= $(templates);
		
		$templates.each( function () {
			var $tmpl	= $(this),
				dataKey	= $tmpl.attr("data"), 						//TODO: put in error checking
				data	= $.JSTemplates.resolveKey( dataKey, map ),
				$result = $tmpl.applyTemplate( data ); //apply a template substitution
			
			$tmpl.after( $result )
				.remove();
		});
		
		return $("<div></div>").append($html).html(); //wrap to extract the applied template results
	};
	$.JSTemplates.resolveKey = function ( dataKey, map ) { //translates a key to its value in map
		var splitKey	= dataKey.split("."),
			value 		= map,
			temp 		= "";
		
		for( var SK in splitKey ) { //Handle map traversal 
			temp = splitKey[SK];	//cache current key
			if( value[temp] != undefined ) {
				value = value[temp];
			}
			else {	//key maps to an invalid location in map, break out
				value = "";
				console ? console.log("Key: " + dataKey + " element " + temp + " undefined in template map") : null;
				break;
			} 
		}
		
		return value;
	};
})( jQuery );