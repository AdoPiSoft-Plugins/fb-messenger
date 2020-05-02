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
function initFbChatButton(options, cb){
  var proto = (document.location||{protocol: 'http'}).protocol, host = "getbutton.io", url = proto + "//static." + host;
  var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
  s.onload = function () {
    WhWidgetSendButton.init(host, proto, options);
    if(cb) cb()
  };
}

httpGet('/fb-chat-config', function(d){
  var options = JSON.parse(d)
  setTimeout(function(){
    device_store.on('state', function(state){
      if(typeof(WhWidgetSendButton)!='function')
        initFbChatButton(options);
      var is_connected = state.current.status == "connected";
      if(options.hide_on_offline){
        var el = document.getElementById("wh-widget-send-button");
        if(is_connected)
          el.style.display = '';
        else
          el.style.display = 'none';
      }
      
    })
    initFbChatButton(options, function(){
      if(options.hide_on_offline && device_store.get().status != 'connected'){
        document.getElementById("wh-widget-send-button").style.display = 'none';
      }
    })
  }, 1000);
})