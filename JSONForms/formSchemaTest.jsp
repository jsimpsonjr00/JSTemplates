<!DOCTYPE HTML>
<html>
    <head>
        <link rel="stylesheet/less" type="text/css" href="/styles.less">
        
        <script src='/JSCommon/jQuery/jquery.min.js' type='text/javascript'></script>
        <script type='text/javascript' src='/JSCommon/LessCSS/less-1.2.2.min.js'></script>
        
        <script src='/js/JSTemplates.js'></script>
        
        <script src='JSONForms.js'></script>
        <script src='json-form-schema.json'></script>
        
        <jsp:include page='formTemplate.html'></jsp:include>
        <script>
            $(document).ready( function () {
               $("body").JSONForm( testSchema );
            });
        </script>
    </head>
    <body>
        
    </body>
</html>