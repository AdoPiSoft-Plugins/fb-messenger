httpGet = typeof(httpGet) == 'function'? httpGet : function(url, cb){
  var xmlhttp
  if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }else{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      if(cb) cb(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true );
  xmlhttp.send();
}
httpGet('/fb-chat-config', function(d){
  var options = JSON.parse(d)
  var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
  var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
  s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
  var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
})
// var options = {
// 		facebook: "1610138715873203", 
// 		call_to_action: "Message us", 
// 		position: "right", 
// };
