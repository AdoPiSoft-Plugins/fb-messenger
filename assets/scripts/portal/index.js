httpGet = typeof httpGet == "function" ? httpGet : function(url, cb) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (cb) cb(xmlhttp.responseText)
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send()
};

function initFbChatButton(options, cb) {
  var proto = (document.location || {
      protocol: "http"
    }).protocol,
    host = "getbutton.io",
    url = proto + "//static." + host;
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = url + "/widget-send-button/js/init.js";
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
  s.onload = function() {
    WhWidgetSendButton.init(host, proto, options);
    if (cb) cb()
  }
}

function hideIcon() {
  el = document.getElementById("wh-widget-send-button");
  if (el) el.style.display = "none";
  var els = document.querySelectorAll("[id^=gb-widget]");
  for (var i = 0; i < els.length; i++) {
    var e = els[i];
    e.style.display = "none"
  }
}

function showIcon() {
  el = document.getElementById("wh-widget-send-button");
  if (el) el.style.display = "";
  var els = document.querySelectorAll("[id^=gb-widget]");
  for (var i = 0; i < els.length; i++) {
    var e = els[i];
    e.style.display = ""
  }
}
httpGet("/fb-chat-config", function(d) {
  var options = JSON.parse(d);
  setTimeout(function() {
    if (typeof device_store == "undefined") {
      var socket = Socket && Socket.getInstance();
      device_store = {
        events: {},
        on: function(e, fn) {
          device_store.events[e] = device_store.events[e] || [];
          device_store.events[e].push(fn)
        },
        get: function() {
          return {
            status: socket.query.status
          }
        }
      };
      socket._callbacks["$device:connected"].push(function() {
        for (var i = 0; i <= device_store.events["state"].length; i++) {
          var fn = device_store.events["state"][i];
          if (typeof fn == "function") fn({
            current: "connected"
          })
        }
      });
      socket._callbacks["$device:disconnected"].push(function() {
        for (var i = 0; i <= device_store.events["state"].length; i++) {
          var fn = device_store.events["state"][i];
          if (typeof fn == "function") fn({
            current: "disconnected"
          })
        }
      })
    }
    device_store.on("state", function(state) {
      if (typeof WhWidgetSendButton == "undefined") initFbChatButton(options);
      var is_connected = state.current.status == "connected";
      setTimeout(function() {
        if (options.hide_on_offline) {
          if (is_connected) showIcon();
          else hideIcon()
        }
      }, 1e3)
    });
    initFbChatButton(options, function() {
      setTimeout(function() {
        if (options.hide_on_offline && device_store.get().status != "connected") {
          hideIcon()
        }
      }, 1e3)
    })
  }, 3e3)
});