(function () {
  'use strict';
  var App = angular.module('Plugins')
  .config(function($stateProvider) {
    $stateProvider
    .state('plugins.fb_messenger', {
      templateUrl : "/plugins/fb-messenger/views/index.html",
      controller: 'FBMessengerCtrl',
      url: '/plugins/fb-messenger',
      title: 'FB Messenger',
      sidebarMeta: {
        order: 2,
      },
    });
  });
})();
