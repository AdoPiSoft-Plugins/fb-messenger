(function() {
  "use strict";
  var App = angular.module("Plugins");
  App.controller("FBMessengerCtrl", function($scope, FBMessengerService, toastr) {
    FBMessengerService.get().then(function(cfg) {
      var data = cfg.data;
      $scope.position = data.position || "left";
      $scope.facebook = data.facebook || "712346362287169";
      $scope.call_to_action = data.call_to_action || "Message us";
      $scope.hide_on_offline = data.hide_on_offline
    });
    $scope.submit = function() {
      var cfg = {
        position: $scope.position,
        facebook: $scope.facebook,
        call_to_action: $scope.call_to_action,
        hide_on_offline: $scope.hide_on_offline
      };
      FBMessengerService.update(cfg).then(function() {
        toastr.success("Plugin settings successfully saved")
      })
    }
  })
})();