(function(a){if(a.JSTemplates===void 0)a.JSTemplates={};a.JSTemplates.substitute=function(c,f){var d=a.JSTemplates.evalInlineTemplates(c,f);return d=d.replace(/\$\{([^\s\}]+)(?:([^\s\}]+))?\}/g,function(d,c){var b=c.split(":"),h=a.JSTemplates.resolveKey(b[b.length-1],f);b.length>1&&(b=a("#"+b[0]),h=a("<div></div>").append(b.applyTemplate(h)).html());return h.toString()})};a.JSTemplates.evalInlineTemplates=function(c,f){var d=a(c),e=d.find("template").get().reverse();a(e).each(function(){var c=a(this),
b=c.attr("data"),b=a.JSTemplates.resolveKey(b,f),b=c.applyTemplate(b);c.after(b).remove()});return a("<div></div>").append(d).html()};a.JSTemplates.resolveKey=function(a,f){var d=a.split("."),e=f,g="",b;for(b in d)if(g=d[b],e[g]!=void 0)e=e[g];else{e="";console&&console.log("Key: "+a+" element "+g+" undefined in template map");break}return e}})(jQuery);
(function(a){a.fn.applyTemplate=function(c){var f=this.html(),d="",e;if(c instanceof Array)for(e in c)d+=a.JSTemplates.substitute(f,c[e]);else d=a.JSTemplates.substitute(f,c);return a(d)}})(jQuery);