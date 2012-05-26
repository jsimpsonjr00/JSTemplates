JSTemplates - Simple jQuery substitution template plugin
==================

JSTemplates is a simple substitution based template plugin to jQuery based loosely on the Dojo.string.substitute 
method and syntax. I've extended and altered the functionality however to include full path map traversals, 
nested template invocation and automatic iteration through arrays.

JSTemplates separates data preparation from the templates themselves. If a particular value requires some sort
of evaluation, that must be performed in javascript prior to applying a template. At this time, no plans are 
in place to include data manipulation within templates. In my opinion, the two should be strictly separate.

Apply Template
=============

The module included in applyTemplate.js extends jQuery objects to interpret inner html of the associated 
element as a template. Example usage:

$("#my-template").applyTemplate( dataMap );

The dataMap may be either an Array or object. In the case of an array, each item is iterated through applying the template
to each. Returns a jQuery object result of the evaluated template and data. 

Template Example and Explaination
===============

Templates follow the script block method so as not to include the template as part of the DOM. For example:

    <script type='text/html' id='my-template'>
        <h3>${title}</h3>
        <div class='item-text'>
            ${text.html}
        </div>
        <div class='tags'>
            ${my-tag-template:tags}
        </div>
        <template data='map.full.path.key'>
            ${data.relative.path.key}
        </template>
    </script>    
      
This example includes the supported substitution methods and an inline template example. ${title} is replaced by the dataMap.title string, while
${text.html} traverses to dataMap.text.html before substitution. Finally, ${my-tag-template:tags} invokes a nested template
by executing $("#my-tag-template).applyTemplate( dataMap.tags ) whose return value is converted to html and substituted
into #my-template. This allows for most use cases and nested template support is quite powerful.

Inline Templates
============
Inline templates are an alternative approach to the ID form. Rather than including each template in its own script tag you
may include template elements directly within the parent. These take the form of a custom HTML tag and evaluate the code
within as if sent to applyTemplate. These are primarily intended for looping through arrays within a given data map. Here's 
a very simple example:

    <template data='map.full.path.key'>
        ${data.relative.path.key}
    </template>
    
All data attributes are relative to the templates initial data map. Subsequent usage within the inline template is relative
to the data key specified by the data attribute.

Template Substitution
============
The JSTemplates.js file contains a number of methods namespaced to $.JSTemplates. The primary method is 
$.JSTemplates.substitute which performs substitutions and processes inline templates with the other helper functions in the
$.JSTemplates namespace. This is a helper function utilized by applyTemplate to convert individual data entries into html strings. It may also be used directly if desired with the form:
$.JSTemplates.substitute( $("#my-template").html(), dataMap ); However, this method only works on 1 individual item and will not
iterate through arrays. I do not recommend direct usage typically. 