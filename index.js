var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if (settings.ep_google_analytics){ 
  var gaCode = settings.ep_google_analytics.gaCode;
}else{
  var gaCode = false;
}

exports.eejsBlock_scripts = function (hookName, context, cb) {
  if(gaCode){
    var gaString = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaCode}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${gaCode}');
    </script>
`
  }
  else{ 
    var gaString = "<script>alert('ep_google_analytics.gaCode not set in settings.json, insert it in /admin/settings')</script>";
  }

  context.content = gaString + context.content; // add Google Analytics to the contents
  
  return cb();
}